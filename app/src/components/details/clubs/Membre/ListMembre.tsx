'use client';

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Dropdown, DropdownTrigger, DropdownMenu,
	DropdownItem, Button, Input, Pagination, Select, SelectItem
} from "@heroui/react";
import { Eye, Edit, Trash2, Search, MoreVertical, Funnel } from 'lucide-react';
import { membresExample } from "@/types/Membre/Membre";
import type { ClubID } from '@/types/Club/Club';
import { div } from "framer-motion/client";

const columns = [
	{ label: "NOM", id: "nom"},
	{ label: "RÔLE", id: "role"},
	{ label: "CLASSE", id: "classe" },
	{ label: "EMAIL", id: "email" },
	{ label: "STATUT", id: "status" },
	{ label: "ACTIONS", id: "actions" },
];

const statusColorMap = [
    { statut: "Actif", color: "success" },
	{ statut: "Inactif", color: "danger" },
];

const MemberPerPage = [5, 10, 15];
const defaultRowsPerPage = 5;

const INITIAL_VISIBLE_COLUMNS = ["nom", "role", "classe", "status", "actions"];


export default function ListMembre(props: ClubID) {
	const clubID = props.id;

	const [filterValue, setFilterValue] = React.useState("");
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [classeFilter, setClasseFilter] = React.useState("all");
	const [roleFilter, setRoleFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
	const [page, setPage] = React.useState(1);
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));

	const hasSearchFilter = Boolean(filterValue);

	const uniqueClasses = React.useMemo(() => {
		return [...new Set(membresExample.map(m => m.classe))].sort();
	}, []);

	const uniqueRoles = React.useMemo(() => {
		return [...new Set(membresExample.map(m => m.role))].sort();
	}, []);

	const filteredItems = React.useMemo(() => {
		let filtered = [...membresExample];

		if (hasSearchFilter) {
			filtered = filtered.filter((member) =>
				`${member.prenom} ${member.nom}`.toLowerCase().includes(filterValue.toLowerCase()) ||
				member.email.toLowerCase().includes(filterValue.toLowerCase())
			);
		}

		if (statusFilter !== "all") {
			filtered = filtered.filter((member) => {
				const status = member.isActive ? "Actif" : "Inactif";
				return statusFilter === status;
			});
		}

		if (classeFilter !== "all") {
			filtered = filtered.filter((member) => member.classe === classeFilter);
		}

		if (roleFilter !== "all") {
			filtered = filtered.filter((member) => member.role === roleFilter);
		}

		return filtered;
	}, [filterValue, statusFilter, classeFilter, roleFilter, hasSearchFilter]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return filteredItems.slice(start, end);
	}, [filteredItems, page, rowsPerPage]);

	const headerColumns = React.useMemo(() => {
		if (visibleColumns.size === columns.length) return columns;
		return columns.filter((column) => Array.from(visibleColumns).includes(column.id));
	}, [visibleColumns]);


    {/* Contenu tableau */}
	const renderCell = React.useCallback((member: any, columnKey: string) => {
		const cellValue = member[columnKey];

		switch (columnKey) {
			case "nom":
				return (
					<User
						avatarProps={{ radius: "lg", src: member.avatar }}
						description={member.email}
						name={`${member.prenom} ${member.nom}`}
					>
						{member.email}
					</User>
				);
			case "role":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">{cellValue}</p>
					</div>
				);
			case "classe":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm whitespace-nowrap">{cellValue}</p>
					</div>
				);
			case "status":
				const status = member.isActive ? "Actif" : "Inactif";
				const colorInfo = statusColorMap.find(s => s.statut === status);
				return (
					<Chip
						className="text-bold"
						color={(colorInfo?.color as any) || "default"}
						size="sm"
						variant="flat"
					>
						{status}
					</Chip>
				);
			case "actions":
				return (
					<Dropdown>
						<DropdownTrigger>
							<Button isIconOnly size="sm" variant="light">
								<MoreVertical className="text-foreground" size={18} />
							</Button>
						</DropdownTrigger>
						<DropdownMenu>
							<DropdownItem key="view" startContent={<Eye size={16} />}>
								Détails
							</DropdownItem>
							<DropdownItem key="edit" startContent={<Edit size={16} />}>
								Éditer
							</DropdownItem>
							<DropdownItem key="delete" startContent={<Trash2 size={16} />} color="danger">
								Supprimer
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				);
			default:
				return cellValue;
		}
	}, []);

    {/* Value Search */}
	const onSearchChange = React.useCallback((value: string) => {
		setFilterValue(value);
		setPage(1);
	}, []);

    {/* Clear Search */}
	const onClear = React.useCallback(() => {
		setFilterValue("");
		setPage(1);
	}, []);


    {/* Top Tableau (Search + Filter) */}
	const topContent = React.useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
					<Input
						isClearable
                        radius="lg"
						placeholder="Rechercher par nom ou email..."
						startContent={<Search size={18} />}
						value={filterValue}
						onClear={onClear}
						onValueChange={onSearchChange}
						className="w-full lg:w-96"
						classNames={{
							inputWrapper: "border border-default-100 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
						}}
                    
					/>
					<div className="p-2 rounded-xl bg-primary w-full lg:w-auto border border-default-100 shadow-sm dark:shadow-xl">
						<div className="flex flex-wrap items-center gap-2 justify-center space-around">
							<div className="flex items-center gap-2 ">
								<Funnel size={18} />
								<span className="text-sm">
									Filtres
								</span>
							</div>

							{/* Filtres */}
							{/* Statut, Classe, Rôle */}
							<div className="flex items-center gap-2 flex-wrap ">
								<Dropdown>
									<DropdownTrigger className="flex bg-background border border-default-100 shadow-sm dark:shadow-xl">
										<Button size="sm" variant="flat">
											Statut
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										aria-label="Filtre de statut"
										closeOnSelect={true}
										selectedKeys={new Set([statusFilter])}
										selectionMode="single"
										onSelectionChange={(keys) => {
											setStatusFilter(Array.from(keys)[0] as string);
											setPage(1);
										}}
										classNames={{
											list: "bg-primary",
										}}
									>
										<DropdownItem key="all">Tous</DropdownItem>
										<DropdownItem key="Actif">Actif</DropdownItem>
										<DropdownItem key="Inactif">Inactif</DropdownItem>
									</DropdownMenu>
								</Dropdown>
								<Dropdown>
									<DropdownTrigger className="flex bg-background border border-default-100 shadow-sm dark:shadow-xl">
										<Button size="sm" variant="flat">
											Classe
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										aria-label="Filtre de classe"
										closeOnSelect={true}
										selectedKeys={new Set([classeFilter])}
										selectionMode="single"
										onSelectionChange={(keys) => {
											setClasseFilter(Array.from(keys)[0] as string);
											setPage(1);
										}}
									>
										<DropdownItem key="all">Toutes</DropdownItem>
										<>
											{uniqueClasses.map((classe) => (
												<DropdownItem key={classe} textValue={classe}>
													{classe}
												</DropdownItem>
											))}
										</>
									</DropdownMenu>
								</Dropdown>
								<Dropdown>
									<DropdownTrigger className="flex bg-background border border-default-100 shadow-sm dark:shadow-xl">
										<Button size="sm" variant="flat">
											Rôle
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										aria-label="Filtre de rôle"
										closeOnSelect={true}
										selectedKeys={new Set([roleFilter])}
										selectionMode="single"
										onSelectionChange={(keys) => {
											setRoleFilter(Array.from(keys)[0] as string);
											setPage(1);
										}}
									>
										<DropdownItem key="all">Tous</DropdownItem>
										<>
											{uniqueRoles.map((role) => (
												<DropdownItem key={role} textValue={role}>
													{role}
												</DropdownItem>
											))}
										</>
									</DropdownMenu>
								</Dropdown>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		);
	}, [filterValue, statusFilter, classeFilter, roleFilter, onSearchChange, onClear, uniqueClasses, uniqueRoles]);

    {/* Bottom Tableau (Pagination/count/nb per page) */}
	const bottomContent = React.useMemo(() => {
		return (
			<div className="grid grid-cols-3 items-center gap-4 py-2 px-2">
				<div className="flex flex-col items-center sm:items-start mt-3">
					<span className="text-foreground text-xs sm:text-sm">Total: </span>
					<span className="font-bold text-foreground text-xs sm:text-sm">{filteredItems.length} membres</span>
				</div>

				<div className="flex justify-center mt-3">
					<Pagination
						isCompact
						showControls
						color="primary"
						page={page}
						total={pages}
						onChange={setPage}
						size="sm"
						classNames={{
							wrapper: "border border-default-100 shadow-sm dark:shadow-xl gap-0.5 sm:gap-1",
						}}
					/>
				</div>
				
				<div className="flex flex-col items-center sm:items-end gap-1 sm:gap-2">
					<span className="text-foreground text-xs sm:text-sm whitespace-nowrap">Membres/page:</span>
					<Select
						selectedKeys={new Set([rowsPerPage.toString()])}
						onChange={(e) => {
						setRowsPerPage(Number(e.target.value));
						setPage(1);
						}}
						size="sm"
						disallowEmptySelection
						className="	w-20"
						classNames={{
							listbox: "bg-primary",
							trigger: "bg-primary border border-default-100 shadow-sm dark:shadow-xl",
						}}
					>
						{MemberPerPage.map((num) => (
						<SelectItem key={num}>
							{num.toString()}
						</SelectItem>
						))}
					</Select>
				</div>
			</div>
		);
	}, [filteredItems.length, page, pages, rowsPerPage]);

	return (
        <Table
            isHeaderSticky
            aria-label="Table des membres du club"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            topContent={topContent}
            topContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[600px] bg-primary/90 border border-default-100 shadow-sm dark:shadow-xl",
                tbody: "bg-primary/90",
                th:"bg-background/90 shadow-sm dark:shadow-xl"
            }}
        >
            <TableHeader columns={headerColumns} >
                {(column) => (
                    <TableColumn
                        key={column.id}
                        align={column.id === "actions" ? "center" : "start"}
                    >
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent="Aucun membre trouvé" items={items}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
	);
}

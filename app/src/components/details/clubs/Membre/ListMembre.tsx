'use client';

import React from "react";
import { Table, TableHeader, TableColumn, TableBody,
	TableRow,
	TableCell,
	User,
	Chip,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	Input,
	Pagination,
} from "@heroui/react";
import { Eye, Edit, Trash2, Search, MoreVertical } from 'lucide-react';
import { membresExample } from "@/types/Membre/Membre";
import type { ClubID } from '@/types/Club/Club';
import { div } from "framer-motion/client";

const columns = [
	{ label: "NOM", id: "nom"},
	{ label: "RÔLE", id: "role"},
	{ label: "EMAIL", id: "email" },
	{ label: "STATUT", id: "status" },
	{ label: "ACTIONS", id: "actions" },
];

const statusColorMap = [
    { statut: "Actif", color: "success" },
	{ statut: "Inactif", color: "danger" },
];

const MemberPerPage = [5, 10, 15];

const INITIAL_VISIBLE_COLUMNS = ["nom", "role", "email", "status", "actions"];

export default function ListMembre(props: ClubID) {
	const clubID = props.id;

	const [filterValue, setFilterValue] = React.useState("");
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [page, setPage] = React.useState(1);
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));

	const hasSearchFilter = Boolean(filterValue);

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

		return filtered;
	}, [filterValue, statusFilter, hasSearchFilter]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

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
			case "status":
				const status = member.isActive ? "Actif" : "Inactif";
				const colorInfo = statusColorMap.find(s => s.statut === status);
				return (
					<Chip
						className="capitalize"
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
								<MoreVertical className="text-default-300" size={18} />
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

    {/* Number per page */}
	const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);


    {/* Top Tableau (Search + Filter + Count membres + Number per page) */}
	const topContent = React.useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
                        radius="lg"
						className="w-full sm:max-w-[44%]"
						placeholder="Rechercher par nom ou email..."
						startContent={<Search size={18} />}
						value={filterValue}
						onClear={onClear}
						onValueChange={onSearchChange}
                    
					/>
					<div className="flex gap-3">
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
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
							>
								<DropdownItem key="all">Tous</DropdownItem>
								<DropdownItem key="Actif">Actif</DropdownItem>
								<DropdownItem key="Inactif">Inactif</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">Total {filteredItems.length} membres</span>
					<label className="flex items-center text-default-400 text-small">
						Membres par page:
						<select
							className="bg-transparent outline-solid outline-transparent text-default-400 text-small ml-2"
							onChange={onRowsPerPageChange}
							defaultValue="5"
						>
                            {MemberPerPage.map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))}
						</select>
					</label>
				</div>
			</div>
		);
	}, [filterValue, statusFilter, filteredItems.length, onSearchChange, onRowsPerPageChange, onClear]);

    {/* Bottom Tableau (Pagination) */}
	const bottomContent = React.useMemo(() => {
		return (
			<div className="py-2 px-2 flex justify-center">
				<Pagination
					isCompact
					showControls
					color="primary"
					page={page}
					total={pages}
					onChange={setPage}
				/>
			</div>
		);
	}, [page, pages]);

	return (
        <Table
            isHeaderSticky
            aria-label="Table des membres du club"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            topContent={topContent}
            topContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[600px] bg-background",
                tbody: "bg-background",
                th:"bg-content1"
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
            <TableBody emptyContent="Aucun membre trouvé" items={filteredItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
	);
}

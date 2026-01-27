'use client';

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, 
	Chip, Input, DropdownItem, DropdownMenu, DropdownTrigger, Button, Dropdown } from "@heroui/react";
import { FilterButton } from '@/components/commons/FilterButton';
import { Eye, Edit, Trash2, Search, MoreVertical, Users } from 'lucide-react';
import type { ClubID } from '@/types/Club/Club';
import { membresExample } from '@/types/Membre/Membre';
import { PaginationSection } from "@/components/commons/PaginationSection";
import SectionTitle from "@/components/commons/SectionTitle";

const columns = [
	{ label: "NOM", id: "nom"},
	{ label: "RÔLE", id: "role"},
	{ label: "CLASSE", id: "classe" },
	{ label: "EMAIL", id: "email" },
	{ label: "STATUT", id: "status" },
	{ label: "ACTIONS", id: "actions" },
];

const detailsItem = [
  { key: "view", label: "Détails", icon: Eye },
  { key: "edit", label: "Éditer", icon: Edit },
  { key: "delete", label: "Supprimer", icon: Trash2, isDanger: true },
];

const statusColorMap = [
    { statut: "Actif", className: "bg-emerald-200 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30" },
	{ statut: "Inactif", className: "bg-red-200 dark:bg-red-500/10 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-500/30" },
];

const MemberPerPage = [5, 10, 15];
const defaultRowsPerPage = 5;

const INITIAL_VISIBLE_COLUMNS = ["nom", "role", "classe", "status", "actions"];

export default function ListMembre(props: ClubID) {
	const [filterValue, setFilterValue] = React.useState("");
	const [statusFilter, setStatusFilter] = React.useState("all");
	const [classeFilter, setClasseFilter] = React.useState("all");
	const [roleFilter, setRoleFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
	const [page, setPage] = React.useState(1);
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));

	const clubID = props.id;

	const uniqueClasses = React.useMemo(() => {
		const classes = [...new Set(membresExample.map(m => m.classe))].sort();
		return [
			{ key: 'all', label: 'Toutes' },
			...classes.map(c => ({ key: c, label: c }))
		];
	}, []);

	const uniqueRoles = React.useMemo(() => {
		const roles = [...new Set(membresExample.map(m => m.role))].sort();
		return [
			{ key: 'all', label: 'Tous' },
			...roles.map(r => ({ key: r, label: r }))
		];
	}, []);

	const statutTypes = React.useMemo(() => [
		{ key: 'all', label: 'Tous' },
		{ key: 'actif', label: 'Actif' },
		{ key: 'inactif', label: 'Inactif' },
	], []);

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
				const status = member.isActive ? "actif" : "inactif";
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
						classNames={{
							base: colorInfo?.className
						}}
						size="sm"
						variant="flat"
					>
						{status}
					</Chip>
				);
			case "actions":
				return (
					<Dropdown className='bg-transparent border-0 shadow-none'>
						<DropdownTrigger>
							<Button isIconOnly size="sm" variant="light">
								<MoreVertical className="text-foreground" size={18} />
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							classNames={{
								list: "bg-primary p-2 rounded-lg  border border-default-200",
							}}	
						>
							{detailsItem.map((item) => {
								const Icon = item.icon;
								return (
									<DropdownItem 
										key={item.key} 
										startContent={<Icon size={16} />}
										color={item.isDanger ? "danger" : "default"}
									>
										{item.label}
									</DropdownItem>
								);
							})}
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
				<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center sm:justify-between">
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
							inputWrapper: "border border-default-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
						}}
                    
					/>
						
					{/* Filtres */}
					{/* Statut, Classe, Rôle */}
					<div className="flex gap-2 w-full sm:w-auto">
						<FilterButton
							label="Statut"
							options={statutTypes}
							selectedKeys={new Set([statusFilter])}
							onSelectionChange={(keys) => {
								setStatusFilter(Array.from(keys)[0] as string);
								setPage(1);
							}}
							className="flex-1 sm:flex-none"
						/>
						<FilterButton
							label="Classe"
							options={uniqueClasses}
							selectedKeys={new Set([classeFilter])}
							onSelectionChange={(keys) => {
								setClasseFilter(Array.from(keys)[0] as string);
								setPage(1);
							}}
							className="flex-1 sm:flex-none"
						/>
						<FilterButton
							label="Rôle"
							options={uniqueRoles}
							selectedKeys={new Set([roleFilter])}
							onSelectionChange={(keys) => {
								setRoleFilter(Array.from(keys)[0] as string);
								setPage(1);
							}}
							className="flex-1 sm:flex-none"
						/>
					</div>
				</div>
			</div>
		);
	}, [filterValue, statusFilter, classeFilter, roleFilter, onSearchChange, onClear, uniqueClasses, uniqueRoles, statutTypes]);

    {/* Bottom Tableau (Pagination/count/nb per page) */}
	const bottomContent = React.useMemo(() => {
		return (
			<PaginationSection
				totalItems={filteredItems.length}
				itemLabel="membres"
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={MemberPerPage}
				onRowsPerPageChange={(value) => {
					setRowsPerPage(value);
					setPage(1);
				}}
				page={page}
				totalPages={pages}
				onPageChange={setPage}
			/>
		);
	}, [filteredItems.length, page, pages, rowsPerPage]);

	return (
		<div className="w-full bg-primary border border-default-200 shadow-sm dark:shadow-xl rounded-xl p-3 sm:p-6">
			
			<div className="mb-4">
				<SectionTitle icon={<Users size={16} className="sm:w-5 sm:h-5" />} title="Activités des heures" />
			</div>
			
			<Table
				isHeaderSticky
				aria-label="Table des membres du club"
				bottomContent={bottomContent}
				bottomContentPlacement="outside"
				topContent={topContent}
				topContentPlacement="outside"
				classNames={{
					wrapper: "max-h-[600px] bg-primary border border-default-200 shadow-sm dark:shadow-xl",
					tbody: "bg-primary",
					th:"bg-background shadow-sm dark:shadow-xl",
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
						<TableRow key={item.MembreID}>
							{(columnKey) => <TableCell>{renderCell(item, String(columnKey))}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

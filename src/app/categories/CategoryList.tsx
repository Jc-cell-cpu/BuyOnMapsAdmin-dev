'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Edit, Plus } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Card } from "@/components/ui/card"

import DeleteConfirmDialog from "./delete-confirm-dialog"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Category } from "./type"

// Dummy Data with improved structure
const initialCategories: Category[] = [
    {
        id: 1,
        name: "Furniture",
        image: "/placeholder.svg?height=50&width=50",
        updatedAt: new Date().toISOString(),
        fields: [
            { type: "text", label: "Material" },
            { type: "select", label: "Color", options: ["Black", "White", "Brown"] },
        ],
    },
    {
        id: 2,
        name: "Cars",
        image: "/placeholder.svg?height=50&width=50",
        updatedAt: new Date().toISOString(),
        fields: [
            { type: "text", label: "Brand" },
            { type: "number", label: "Year" },
        ],
    },
]

export default function CategoryList() {
    const router = useRouter()
    const [categories, setCategories] = useState<Category[]>(initialCategories)
    const [currentPage, setCurrentPage] = useState(1)
    const [deleteCategory, setDeleteCategory] = useState<number | null>(null)
    const itemsPerPage = 10

    const handleDeleteCategory = (id: number) => {
        setDeleteCategory(id)
    }

    const confirmDelete = () => {
        if (deleteCategory) {
            setCategories(categories.filter((cat) => cat.id !== deleteCategory))
            setDeleteCategory(null)
        }
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(categories.length / itemsPerPage)

    return (
        <Card className='border-none shadow-2xl px-8 dark:bg-slate-800'>
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Category List</h1>
                    <Button variant={"gradiant"}
                        onClick={() => router.push('/categories/[id]/manage')}
                        className="flex items-center"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button>
                </div>


                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Fields</TableHead>
                            <TableHead>Last Updated</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentCategories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    {category.image && (
                                        <div className="relative h-[50px] w-[50px]">
                                            {/* <Image
                                                src={category.image}
                                                alt={category.name}
                                                fill
                                                className="rounded-md object-cover"
                                            /> */}
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell>
                                    <ul className="list-disc list-inside">
                                        {category.fields.map((field, index) => (
                                            <li key={index}>
                                                {field.label} ({field.type})
                                                {field.options && ` - Options: ${field.options.join(", ")}`}
                                            </li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>
                                    {new Date(category.updatedAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => router.push(`/categories/manage?id=${category.id}`)}
                                    >
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Edit {category.name}</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete {category.name}</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


                {totalPages > 1 && (
                    <Pagination className="mt-4">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        onClick={() => setCurrentPage(page)}
                                        isActive={currentPage === page}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}

                <DeleteConfirmDialog
                    isOpen={deleteCategory !== null}
                    onClose={() => setDeleteCategory(null)}
                    onConfirm={confirmDelete}
                />
            </div>
        </Card>
    )
}


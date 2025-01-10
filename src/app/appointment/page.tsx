"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar, Clock, User } from 'lucide-react'
import DefaultLayout from "@/components/Layouts/DefaultLaout"

// Types for our appointments
type AppointmentStatus = "booked" | "cancelled" | "rebooked"

interface Appointment {
    id: string
    patientName: string
    date: string
    time: string
    status: AppointmentStatus
}

// Sample data
const initialAppointments: Appointment[] = [
    {
        id: "1",
        patientName: "John Doe",
        date: "2025-01-10",
        time: "09:00 AM",
        status: "booked",
    },
    {
        id: "2",
        patientName: "Jane Smith",
        date: "2025-01-10",
        time: "10:30 AM",
        status: "cancelled",
    },
    {
        id: "3",
        patientName: "Mike Johnson",
        date: "2025-01-11",
        time: "02:00 PM",
        status: "rebooked",
    },
    {
        id: "4",
        patientName: "Sarah Williams",
        date: "2025-01-11",
        time: "03:30 PM",
        status: "booked",
    },
    {
        id: "5",
        patientName: "Robert Brown",
        date: "2025-01-12",
        time: "11:00 AM",
        status: "cancelled",
    },
]

export default function AppointmentsList() {
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
    const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">("all")

    // Calculate counts
    const totalAppointments = appointments.length
    const bookedCount = appointments.filter((apt) => apt.status === "booked").length
    const cancelledCount = appointments.filter(
        (apt) => apt.status === "cancelled"
    ).length
    const rebookedCount = appointments.filter(
        (apt) => apt.status === "rebooked"
    ).length

    // Filter appointments based on selected status
    const filteredAppointments = appointments.filter((apt) =>
        statusFilter === "all" ? true : apt.status === statusFilter
    )

    // Update appointment status
    const updateStatus = (id: string, newStatus: AppointmentStatus) => {
        setAppointments(
            appointments.map((apt) =>
                apt.id === id ? { ...apt, status: newStatus } : apt
            )
        )
    }

    // Get appropriate badge color based on status
    const getStatusBadgeColor = (status: AppointmentStatus) => {
        switch (status) {
            case "booked":
                return "bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
            case "cancelled":
                return "bg-red-500 hover:bg-red-600 dark:bg-red-500  dark:hover:bg-red-600"
            case "rebooked":
                return "bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
            default:
                return "bg-gray-500 hover:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-600"
        }
    }

    return (
        <DefaultLayout>
            <div className="container mx-auto p-4 space-y-6">
                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="dark:bg-slate-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Appointments
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalAppointments}</div>
                        </CardContent>
                    </Card>
                    <Card className="dark:bg-slate-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Booked</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{bookedCount}</div>
                        </CardContent>
                    </Card>
                    <Card className="dark:bg-slate-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{cancelledCount}</div>
                        </CardContent>
                    </Card>
                    <Card className="dark:bg-slate-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Rebooked</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{rebookedCount}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter and List */}
                <Card className="dark:bg-slate-800">
                    <CardHeader className="dark:bg-slate-800">
                        <CardTitle>Appointments</CardTitle>
                        <CardDescription>Manage your appointments here</CardDescription>
                        <div className="mt-4 w-[200px] dark:bg-slate-800">
                            <Select
                                value={statusFilter}
                                onValueChange={(value) =>
                                    setStatusFilter(value as AppointmentStatus | "all")
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Appointments</SelectItem>
                                    <SelectItem value="booked">Booked</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                    <SelectItem value="rebooked">Rebooked</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredAppointments.map((appointment) => (
                                <div
                                    key={appointment.id}
                                    className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg space-y-4 md:space-y-0"
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <User className="w-4 h-4" />
                                            <span className="font-medium">{appointment.patientName}</span>
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{appointment.date}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{appointment.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 w-full md:w-auto">
                                        <Badge
                                            className={`${getStatusBadgeColor(
                                                appointment.status
                                            )} text-white`}
                                        >
                                            {appointment.status.charAt(0).toUpperCase() +
                                                appointment.status.slice(1)}
                                        </Badge>
                                        <div className="flex space-x-2 ml-auto md:ml-4">
                                            {appointment.status !== "booked" && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateStatus(appointment.id, "booked")}
                                                >
                                                    Mark Booked
                                                </Button>
                                            )}
                                            {appointment.status !== "cancelled" && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateStatus(appointment.id, "cancelled")}
                                                >
                                                    Cancel
                                                </Button>
                                            )}
                                            {appointment.status !== "rebooked" && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => updateStatus(appointment.id, "rebooked")}
                                                >
                                                    Rebook
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DefaultLayout>
    )
}


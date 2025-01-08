"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import DefaultLayout from "@/components/Layouts/DefaultLaout"


// Mock API function
const savePermissions = async (permissions: string[]) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true }
}

const features = [
    { id: "post", label: "Create Posts" },
    { id: "comment", label: "Leave Comments" },
    { id: "upload", label: "Upload Files" },
    { id: "analytics", label: "View Analytics" },
    { id: "support", label: "Priority Support" },
]

export default function RadiusManagement() {
    const [freePermissions, setFreePermissions] = useState<string[]>(["post", "comment"])
    const [isLoading, setIsLoading] = useState(false)

    const handlePermissionChange = (permission: string) => {
        setFreePermissions(current =>
            current.includes(permission)
                ? current.filter(p => p !== permission)
                : [...current, permission]
        )
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const result = await savePermissions(freePermissions)
            if (result.success) {
                toast({
                    title: "Permissions updated",
                    description: "Free user permissions have been successfully updated.",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update permissions. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <DefaultLayout>
            <div className="container mx-auto py-10">
                <h1 className="text-3xl font-bold mb-6">Radius Management</h1>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Free User Permissions</CardTitle>
                            <CardDescription>Set the features available to free users</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {features.map((feature) => (
                                    <div key={feature.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={feature.id}
                                            checked={freePermissions.includes(feature.id)}
                                            onCheckedChange={() => handlePermissionChange(feature.id)}
                                        />
                                        <label
                                            htmlFor={feature.id}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {feature.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSubmit} disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Permission Comparison</CardTitle>
                            <CardDescription>Compare free and premium user permissions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {features.map((feature) => (
                                    <div key={feature.id} className="grid grid-cols-3 items-center">
                                        <span className="text-sm font-medium">{feature.label}</span>
                                        <span className="text-center">
                                            {freePermissions.includes(feature.id) ? "✅" : "❌"}
                                        </span>
                                        <span className="text-center">✅</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="justify-between">
                            <div className="text-sm text-muted-foreground">Free User</div>
                            <div className="text-sm font-medium">Premium User</div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </DefaultLayout>
    )
}


import { motion } from 'framer-motion';
import {
    Bus,
    Clock,
    Edit,
    MapPin,
    Plus,
    Route,
    Trash2,
    User,
    Users,
} from 'lucide-react';
import React, { useState } from 'react';
import { Layout } from '../../components/common/Layout';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';

export function TransportManagement(){

    const [routes,setRoutes] = useState([
        {
            id:1,
            routeName:"Sector 15 - College",
            driver:"Ramesh",
            stops:["Sector 15","Sector 10","College"],
            timing:"7:30 AM",
            fare:1200
        }
    ])

    const [showAddModal,setShowAddModal] = useState(false)

    const [formData,setFormData] = useState({
        routeName:"",
        driver:"",
        stops:"",
        timing:"",
        fare:""
    })

    const handleAddRoute=(e:React.FormEvent)=>{
        e.preventDefault()

        const newRoute={
            id:Date.now(),
            routeName:formData.routeName,
            driver:formData.driver,
            stops:formData.stops.split(','),
            timing:formData.timing,
            fare:Number(formData.fare)
        }

        setRoutes(prev=>[...prev,newRoute])

        setFormData({
            routeName:"",
            driver:"",
            stops:"",
            timing:"",
            fare:""
        })
    }

    const handleDelete=(id:number)=>{
        setRoutes(prev=>prev.filter(r=>r.id!==id))
    }

    return(
        <Layout title="Transport Management">

            <div className="space-y-8">

                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Transport Management</h1>

                    <Button onClick={()=>setShowAddModal(true)}>
                        <Plus className="h-4 w-4 mr-2"/>
                        Add New Route
                    </Button>
                </div>

                {showAddModal && (
                    <Card>
                        <CardContent className="p-6">
                            <form onSubmit={handleAddRoute} className="space-y-4">

                                <Input
                                    placeholder="Route Name"
                                    value={formData.routeName}
                                    onChange={e=>setFormData({...formData,routeName:e.target.value})}
                                />

                                <Input
                                    placeholder="Driver"
                                    value={formData.driver}
                                    onChange={e=>setFormData({...formData,driver:e.target.value})}
                                />

                                <Input
                                    placeholder="Stops comma separated"
                                    value={formData.stops}
                                    onChange={e=>setFormData({...formData,stops:e.target.value})}
                                />

                                <Input
                                    placeholder="Timing"
                                    value={formData.timing}
                                    onChange={e=>setFormData({...formData,timing:e.target.value})}
                                />

                                <Input
                                    placeholder="Fare"
                                    value={formData.fare}
                                    onChange={e=>setFormData({...formData,fare:e.target.value})}
                                />

                                <Button type="submit">
                                    Add Route
                                </Button>

                            </form>
                        </CardContent>
                    </Card>
                )}

                <div className="space-y-4">

                    {routes.map(route=>(
                        <Card key={route.id}>
                            <CardContent className="p-6 flex justify-between">

                                <div>
                                    <h3 className="font-semibold">{route.routeName}</h3>
                                    <p>Driver: {route.driver}</p>
                                    <p>Timing: {route.timing}</p>
                                    <p>Fare: ₹{route.fare}</p>
                                </div>

                                <div className="flex gap-2">

                                    <Button size="sm" variant="outline">
                                        <Edit className="h-3 w-3 mr-1"/>Edit
                                    </Button>

                                    <Button size="sm" variant="ghost" onClick={()=>handleDelete(route.id)}>
                                        <Trash2 className="h-3 w-3 mr-1 text-red-600"/>Delete
                                    </Button>

                                </div>

                            </CardContent>
                        </Card>
                    ))}

                </div>

            </div>

        </Layout>
    )
}
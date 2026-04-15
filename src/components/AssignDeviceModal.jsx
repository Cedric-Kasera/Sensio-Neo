import React, { useState } from 'react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAssignDevice } from '../features/devices/hooks';
import { Loader2 } from 'lucide-react';

export function AssignDeviceModal({ device, isOpen, onClose }) {
    const [newbornId, setNewbornId] = useState('');
    const [hospitalId, setHospitalId] = useState('');

    const { mutate: assignDevice, isPending } = useAssignDevice();

    const handleAssign = (e) => {
        e.preventDefault();
        if (!device) return;

        assignDevice({
            deviceKey: device.deviceKey,
            data: {
                newbornId,
                hospitalId,
            }
        }, {
            onSuccess: () => {
                onClose();
                setNewbornId('');
                setHospitalId('');
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Assign Device</DialogTitle>
                    <DialogDescription>
                        Assign NeoGuard unit <span className="font-mono font-bold text-[var(--color-primary)]">{device?.deviceKey}</span> to a newborn patient.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleAssign} className="grid py-4">
                    <div className="grid grid-cols-4 items-center gap-4 mb-4">
                        <Label htmlFor="newbornId" className="text-right">
                            Newborn ID
                        </Label>
                        <Input
                            id="newbornId"
                            value={newbornId}
                            onChange={(e) => setNewbornId(e.target.value)}
                            className="col-span-3 font-mono"
                            placeholder="e.g. NB-001"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 mb-6">
                        <Label htmlFor="hospitalId" className="text-right">
                            Hospital Ward
                        </Label>
                        <Input
                            id="hospitalId"
                            value={hospitalId}
                            onChange={(e) => setHospitalId(e.target.value)}
                            className="col-span-3 font-mono"
                            placeholder="e.g. NICU-A"
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={onClose} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Assign Patient
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

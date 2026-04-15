export const mapDevice = (raw) => {
    if (!raw) return null;
    return {
        id: raw.id,
        deviceKey: raw.deviceKey || raw.device_key,
        name: raw.name || `Device ${raw.deviceKey || raw.device_key}`,
        location: raw.location || 'Unknown',
        status: raw.status || 'offline',
        lastSeenAt: raw.lastSeenAt || raw.last_seen_at || null,
        createdAt: raw.createdAt || raw.created_at,
        updatedAt: raw.updatedAt || raw.updated_at,
    };
};

export const mapAssignment = (raw) => {
    if (!raw) return null;
    return {
        id: raw.id,
        deviceId: raw.deviceId || raw.device_id,
        deviceKey: raw.deviceKey || raw.device_key,
        newbornId: raw.newbornId || raw.newborn_id,
        hospitalId: raw.hospitalId || raw.hospital_id,
        active: raw.active,
        assignedAt: raw.assignedAt || raw.assigned_at,
        unassignedAt: raw.unassignedAt || raw.unassigned_at,
        unassignReason: raw.unassignReason || raw.unassign_reason,
        assignedByUserId: raw.assignedByUserId || raw.assigned_by_user_id,
        metadata: raw.metadata || {},
    };
};

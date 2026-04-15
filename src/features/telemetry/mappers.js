export const mapTelemetry = (raw) => {
    if (!raw) return null;
    return {
        id: raw.id,
        deviceId: raw.deviceId || raw.device_id,
        assignmentId: raw.assignmentId || raw.assignment_id,
        newbornId: raw.newbornId || raw.newborn_id,
        hospitalId: raw.hospitalId || raw.hospital_id,
        deviceKey: raw.deviceKey || raw.device_key,
        topic: raw.topic,
        eventType: raw.eventType || raw.event_type,
        status: raw.status,
        temperatureC: raw.temperatureC || raw.temperature_c,
        heartRateBpm: raw.heartRateBpm || raw.heart_rate_bpm,
        spo2Pct: raw.spo2Pct || raw.spo2_pct,
        skinContact: raw.skinContact || raw.skin_contact,
        fingerPresent: raw.fingerPresent || raw.finger_present,
        infant: raw.infant ? {
            newbornId: raw.infant.newbornId || raw.infant.newborn_id,
            hospitalId: raw.infant.hospitalId || raw.infant.hospital_id,
            medicalRecordNumber: raw.infant.medicalRecordNumber || raw.infant.medical_record_number,
            firstName: raw.infant.firstName || raw.infant.first_name,
            lastName: raw.infant.lastName || raw.infant.last_name,
            sex: raw.infant.sex,
            active: raw.infant.active,
        } : null,
        payload: raw.payload || {},
        receivedAt: raw.receivedAt || raw.received_at,
        createdAt: raw.createdAt || raw.created_at,
    };
};

export const mapAlert = (raw) => {
    if (!raw) return null;
    return {
        id: raw.id,
        deviceId: raw.deviceId || raw.device_id,
        assignmentId: raw.assignmentId || raw.assignment_id,
        newbornId: raw.newbornId || raw.newborn_id,
        hospitalId: raw.hospitalId || raw.hospital_id,
        deviceKey: raw.deviceKey || raw.device_key,
        topic: raw.topic,
        severity: raw.severity,
        status: raw.status,
        reason: raw.reason,
        infant: raw.infant ? {
            newbornId: raw.infant.newbornId || raw.infant.newborn_id,
            hospitalId: raw.infant.hospitalId || raw.infant.hospital_id,
            medicalRecordNumber: raw.infant.medicalRecordNumber || raw.infant.medical_record_number,
            firstName: raw.infant.firstName || raw.infant.first_name,
            lastName: raw.infant.lastName || raw.infant.last_name,
            sex: raw.infant.sex,
            active: raw.infant.active,
        } : null,
        payload: raw.payload || {},
        receivedAt: raw.receivedAt || raw.received_at,
        createdAt: raw.createdAt || raw.created_at,
    };
};

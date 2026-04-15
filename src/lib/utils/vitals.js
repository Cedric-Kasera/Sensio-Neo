import { VITAL_STATUS } from '../../constants/status';

export const getHeartRateStatus = (heartRate) => {
    if (heartRate == null) return VITAL_STATUS.NORMAL;
    if (heartRate < 90 || heartRate > 160) return VITAL_STATUS.ALERT;
    if (heartRate > 150) return VITAL_STATUS.WARNING;
    return VITAL_STATUS.NORMAL;
};

export const getTemperatureStatus = (temp) => {
    if (temp == null) return VITAL_STATUS.NORMAL;
    if (temp < 36.0 || temp > 37.5) return VITAL_STATUS.ALERT;
    if (temp > 37.2 || temp < 36.3) return VITAL_STATUS.WARNING;
    return VITAL_STATUS.NORMAL;
};

export const getSpo2Status = (spo2) => {
    if (spo2 == null) return VITAL_STATUS.NORMAL;
    if (spo2 < 90) return VITAL_STATUS.ALERT;
    if (spo2 < 95) return VITAL_STATUS.WARNING;
    return VITAL_STATUS.NORMAL;
};

export const getConsolidatedStatus = (hr, temp, spo2) => {
    const hrStatus = getHeartRateStatus(hr);
    const tempStatus = getTemperatureStatus(temp);
    const spo2Status = getSpo2Status(spo2);

    if (hrStatus === VITAL_STATUS.ALERT || tempStatus === VITAL_STATUS.ALERT || spo2Status === VITAL_STATUS.ALERT) {
        return VITAL_STATUS.ALERT;
    }

    if (hrStatus === VITAL_STATUS.WARNING || tempStatus === VITAL_STATUS.WARNING || spo2Status === VITAL_STATUS.WARNING) {
        return VITAL_STATUS.WARNING;
    }

    return VITAL_STATUS.NORMAL;
};

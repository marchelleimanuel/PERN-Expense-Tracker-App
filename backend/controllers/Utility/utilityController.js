import { SUCCESS_CODE } from "../../common/common.js";

export const GetYearController = (req, res) => {
    
    let latestYear = new Date().getFullYear();
    let data = [];
    const startYear = 1970
    
    for(let year = startYear; year <= latestYear; year++) {
        data.push(year);
    }

    // sort descendingly
    data.sort((a,b) => b-a);

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        data: data
    });
}

export const GetMonthController = (req,res) => {
    let data = [];
    const endMonth = 12;
    const startMonth = 1

    for(let month = startMonth; month <= endMonth; month++) {
        data.push(month);
    }

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        data: data
    });
}

export const GetDayController = (req,res) => {
    let data = [];
    const endDay = 31;
    const startDay = 1

    for(let day = startDay; day <= endDay; day++) {
        data.push(day);
    }

    return res.status(200).json({
        response_code: SUCCESS_CODE,
        data: data
    });
}
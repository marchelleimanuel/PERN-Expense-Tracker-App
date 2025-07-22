import {getDay, getMonth, getYear} from "../services/Common/commonService";

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem('userLogin')) || {};
}

export const getListOfYear = async () => {
    let years = [];
    try {
        const response = await getYear();

        if(response.response_code === 'SUCCESS') {
            years = response.data;
        }

    } catch (error) {
        console.log(error);
    }

    return years;
}

export const getListOfMonth = async () => {
    let months = [];
    try {
        const response = await getMonth();

        if(response.response_code === 'SUCCESS') {
            months = response.data;
        }

    } catch (error) {
        console.log(error);
    }

    return months;
}

export const getListOfDay = async () => {
    let days = [];
    try {
        const response = await getDay();

        if(response.response_code === 'SUCCESS') {
            days = response.data;
        }

    } catch (error) {
        console.log(error);
    }

    return days;
}

export const formatToRupiah = (data) => {
    const formatter = Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    });

    return formatter.format(data);
}

export const formatPercentage = (data) => {
    const formatter = Intl.NumberFormat('id-ID', {
        maximumFractionDigits: 0,
    });

    return formatter.format(data);
}

export const formatDate = (data) => {
    const formattedDate = data.split('T')[0];
    const date = new Date(formattedDate);
    const options = { 
        weekday: "long",
        day: 'numeric',   
        month: 'long',      
        year: 'numeric'     
    };

    const result = new Intl.DateTimeFormat("en-US", options);

    return result.format(date);
}
const BASE_URL = process.env.REACT_APP_BASE_URL

export const auth = {
    SEND_OTP : BASE_URL + '/auth/send_otp',
    SIGN_UP : BASE_URL + '/auth/sign_up',
    LOG_IN : BASE_URL + '/auth/login',
    RESET_PASSWORD_TOKEN : BASE_URL + "/auth/reset_password_token",
    RESET_PASSWORD : BASE_URL + "/auth/reset_password"
}
export const laundry = {
    CREATE_ORDER : BASE_URL + '/laundry/create_order',
    FETCH_ORDER_NUMBER :  BASE_URL + '/laundry/fetch_order_number',
    FETCH_UNDER_WASHING_ORDERS : BASE_URL + '/laundry/fetch_under_washing_orders',
    FETCH_READY_TO_COLLECT_ORDERS : BASE_URL + '/laundry/fetch_ready_to_collect_orders',
    FETCH_COMPLETED_ORDERS : BASE_URL + '/laundry/fetch_completed_orders',
    MAKE_READY_TO_COLLECT : BASE_URL + "/laundry/make_ready_to_collect",
    MAKE_IT_COMPLETED_ORDER : BASE_URL + "/laundry/make_it_completed_order",
    FETCH_STUDENT_ACTIVE_ORDERS : BASE_URL + "/laundry/fetch_student_active_orders",
    FETCH_STUDENT_COMPLETED_ORDERS : BASE_URL + "/laundry/fetch_student_completed_orders",
    PAID_IN_CASH : BASE_URL + "/laundry/paid_in_cash",
    PAID_IN_ONLINE : BASE_URL + "/laundry/paid_in_online",
    FETCH_ORDER_DETAILS : BASE_URL + "/laundry/fetch_order_details"
}
export const cycle = {
    ADD_CYCLE : BASE_URL + "/cycle/add_cycle",
    GET_CYCLE_DETAILS : BASE_URL + "/cycle/get_cycles_details",
    UPDATE_CYCLE_STATUS_TO_REPAIR : BASE_URL + "/cycle/update_cycle_status_to_repair",
    UPDATE_CYCLE_STATUS_TO_WORKING : BASE_URL + "/cycle/update_cycle_status_to_working",
    FIND_AVAILABLE_CYCLE : BASE_URL + "/cycle/find_available_cycle",
    GET_TODAY_BOOKING_DETAILS : BASE_URL + "/cycle/get_today_booking_details",
    GET_STUDENT_BOOKING_DETAILS : BASE_URL + "/cycle/get_student_booking_details",
    ISSUE_BOOKING : BASE_URL + "/cycle/issue_booking",
    COLLECT_BOOKING : BASE_URL + "/cycle/collect_booking",
    GET_AVAILABILITY_DETAILS : BASE_URL + "/cycle/get_availabiity_details"
}

export const canteen = {
    CREATE_ITEM : BASE_URL + "/canteen/create_item",
    GET_ALL_ITEMS : BASE_URL + "/canteen/get_all_items",
    ALTER_ITEM_STATUS : BASE_URL +  "/canteen/alter_item_status",
    GET_MENU : BASE_URL + "/canteen/get_menu",
    GET_ALL_ACTIVE_ORDERS : BASE_URL + "/canteen/get_all_active_orders",
    GET_ALL_DELIVERING_ORDERS: BASE_URL + "/canteen/get_all_delivering_orders",
    MAKE_IT_UNDER_DELIVERING: BASE_URL + "/canteen/make_it_under_delivering",
    MAKE_IT_DELIVERED: BASE_URL + "/canteen/make_it_delivered",
    CREATE_ORDER: BASE_URL + "/canteen/create_order",
    GET_MY_ORDER_DETAILS: BASE_URL + "/canteen/get_my_order_details",
    ORDER_RECEIVED: BASE_URL+ "/canteen/order_received",
    COMPLETE_ORDER: BASE_URL + "/canteen/complete_order",
    ACCEPT_ORDER: BASE_URL + "/canteen/accept_order",
    DECLINE_ORDER: BASE_URL + "/canteen/decline_order"
}

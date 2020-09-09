export const apiBaseUrl = 'https://ctd-rideshare.herokuapp.com/api/v1/';

// paths
export const LOGIN = 'login';
export const DRIVER = 'drivers';
export const RIDES = 'rides';
export const RIDER = 'riders';
export const AVAILABILITIES = 'availabilities';
export const ORGANIZATIONS = 'organizations';
export const REGISTER = 'drivers';
export const VEHICLES = 'vehicles';
export const LOCATIONS = 'locations';
export const PASSWORDCHANGE = 'password_change';
export const CHANGEPASSWORD = 'changes_password';

// params
export const driverRides = '?driver_specific=true';

// these need to be updated
export const LOGOUT = 'logout';
export const SETTINGS = 'drivers';

// these don't work yet, status names are incorrect & params do not filter
export const SCHEDULEDRIDES = 'rides?status=matched';
export const APPROVEDRIDES = 'rides?status=approved';

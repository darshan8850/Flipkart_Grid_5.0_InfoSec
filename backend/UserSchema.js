const mongoose = require('mongoose');

const violatedDataSchema = new mongoose.Schema({
    "_id": String,
    "client_id": String,
    "date_time": String,
    "method": String,
    "request": String,
    "status_code": Number,
    "size": Number,
    "referer": String,
    "user_system_specs":String,
    "type": String,
    "two_factor_authentication": String,
    "multi_factor_authentication": String,
    "security_monitoring": String,
    "data_privacy_policy": String,
    "secure_file_uploads": String,
    "secure_file_uploads_policies__properties__secure_file_name": String,
    "secure_file_uploads_policies__properties__malware_scan": String,
    "secure_file_uploads_policies__properties__audit_logging": String,
    "secure_file_uploads_policies__properties__sandboxing": String,
    "secure_file_uploads_policies__properties__encryption__in_transit": String,
    "secure_file_uploads_policies__properties__encryption__at_rest": String,
    "ssl_encryption_required": String,
    "permissions": String,
    "explicite_allowed_resources": String,
    "other_resources": String
});

module.export = violatedDataSchema;
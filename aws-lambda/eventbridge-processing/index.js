var AWS = require('aws-sdk');
var sli_insert = require('./utility/sli_insert');
var sla_insert = require('./utility/sla_insert');
var slo_insert = require('./utility/slo_insert');
var error_budget_insert = require('./utility/error_budget_insert');
var error_budget_trans_insert = require('./utility/error_budget_trans_insert');

'use strict'

exports.handler = async (event) => {
    console.log('Received SRE event!')
    
    if (event['detail-type'].toString() === "sli") {
        console.log('SLI data received for application: $(event.detail.application_id.toString()}');
        await sli_insert.putSLIItem(event);
    }

     if (event['detail-type'].toString() === "sla") {
        console.log('SLA data received for application: $(event.detail.application_id.toString()}');
        await sla_insert.putSLAItem(event);
    }
    
     if (event['detail-type'].toString() === "slo") {
        console.log('SLO data received for application: $(event.detail.application_id.toString()}');
        await slo_insert.putSLOItem(event);
    }
    
     if (event['detail-type'].toString() === "error_budget") {
        console.log('Error Budget data received for application : $(event.detail.application_id.toString()}');
        await error_budget_insert.putErrorBudgetItem(event);
    }
    
     if (event['detail-type'].toString() === "error_budget_trans") {
        console.log('Error Budget Transaction data received for application: $(event.detail.application_id.toString()}');
        await error_budget_trans_insert.putErrorBudgetTransItem(event);
    }
}
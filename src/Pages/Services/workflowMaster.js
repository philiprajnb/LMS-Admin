function workflowMaster (){
    return {
        scoreMaster: [
            {ChannelID: 'SM',ChannelName: 'Social Media',Score: 10,},
            {ChannelID: 'WR',ChannelName: 'Webinar',Score: 15,},
            {ChannelID: 'WS',ChannelName: 'Website',Score: 20,},
            {ChannelID: 'MA',ChannelName: 'Marketing',Score: 25,},
            {ChannelID: 'CM',ChannelName: 'Campaign',Score: 20,},
            {ChannelID: 'CR',ChannelName: 'Customer Referral',Score: 10,},
            // {ChannelID: 'DB',ChannelName: 'Download Brochres',Score: 10,},
            // {ChannelID: 'DM',ChannelName: 'Watched Demos',Score: 5,},
            // {ChannelID: 'HE',ChannelName: 'Have EMailID',Score: 15,},
            // {ChannelID: 'HP',ChannelName: 'Have Phone No',Score: 15,},
            // {ChannelID: 'CML',ChannelName: 'Calls Made >6',Score: 5,},
            // {ChannelID: 'CMH',ChannelName: 'Calls Made <6',Score: 10,},
            // {ChannelID: 'RE',ChannelName: 'Respond to Email',Score: 5,},
            // {ChannelID: 'ACA',ChannelName: 'Call accepted',Score: 5,},
            // {ChannelID: 'APS',ChannelName: 'Appointment set',Score: 10,},
            // {ChannelID: 'AFNA',ChannelName: 'FNA initiated',Score: 15,},
            // {ChannelID: 'AQG',ChannelName: 'Quote generated',Score: 20,},{
            // ChannelID: 'AAS',ChannelName: 'Application submitted',Score: 25,},
            // {ChannelID: 'ASC',ChannelName: 'Sales closed',Score: 30,},
        ],
        wfStatus: new Map([
            [1, 'Leads Imported'],
            [2, 'Distributed to Agents'],
            [3, 'Appointment Fixed'],
            [4, 'Met the customer'],
            [5, 'FNA initiated'],
            [6, 'Quote generated'],
            [7, 'Application submitted'],
            [8, 'Sales closed'],
            [9, 'Lead Rejected'],
            [10, 'Lead Reassigned to Admin/Agent'],
            [11, 'Lead Created']
        ])
    }
}

export  {workflowMaster}
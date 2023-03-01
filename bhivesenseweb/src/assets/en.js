export default {
    data() {
        return {
            en: {
                spinnerTxt: "Please wait...",
                sbarAccLabel: 'Account',
                sbarAccLogin: 'Login',
                sbarAccNew: "Create account",
                sbarUsers: "Users",
                sbarUsersManage: "Manage Users",
                sbarDevices: "Devices",
                sbarDevicesManage: "Manage devices",
                sbarDevicesNew: "Register device",
                sbarApiaries: "Apiaries",
                sbarApiariesAll: "All apiaries",
                sbarApiariesNew: "Create apiary",
                sbarApiariesDelete: "Delete apiary",
                sbarApiariesAddHive: "Add hive",
                sbarApiariesRemoveHive: "Remove hive",
                sbarApiariesProblem: "Report problem",
                sbarHives: "Hives",
                sbarHivesNew: "Add new hive",
                sbarHivesAll: "Manage hives",
                sbarAnalytics: "Analytics",
                sbarAnalyticsLast: "Last values",
                sbarAnalyticsWeek: "Weekly",
                sbarAnalyticsMonth: "Monthly",
                sbarReport: "Report",
                newAccFormTitle: "CREATE ACCOUNT",
                newAccFnamePh: "First name",
                newAccLnamePh: "Last name",
                newAccNamePh: "Full name",
                newAccNifPh: "ITIN",
                newAccEmailPh: "e-mail",
                newAccMobilePh: "Mobile",
                newAccBdatePh: "Birthdate",
                newAccUserPh: "username",
                newAccPassPh: "password",
                selectLbl: "Type",
                typeOp1: "Individual",
                typeOp2: "Company",
                typeOp3: "Association",
                newAccSubs: "Subscribe notifications?",
                btnSubmit: "SUBMIT",
                btnCancel: "CANCEL",
                btnClean: "RESET",
                btnBack: "BACK",
                btnClose: "CLOSE",
                btnNew: "NEW",
                btnSchedule: "SCHEDULE",
                btnAssign: "ASSIGN",
                btnNotifications: "Notifications",
                profilePhoto: "Profile photo",
                photoButton: "File",
                mesNewAccount: 'Account successfully created.',
                mesUserExists: 'User already exists.',
                mesProblem: 'Server problem, please try again...',
                mesFields: 'Please fill all fields.',
                mesEmptyID: "Invalid ID or empty field!",
                mesFieldsIntervention: 'Invalid dates or empty fields (description or type).',
                mesFieldsApiary: 'Please fill location and address.',
                mesChangeSuccess: "Account successfuly updated!",
                mesChangeInvalid: "Invalid values, please check...",
                mesNoApiaries: "No apiaries found for this user...",
                mesNoInterventions: "No interventions scheduled for this apiary.",
                accFormTitle: "ACCOUNT DETAILS",
                userMenuProfile: "Manage account",
                userMenuLogout: "Logout",
                userMenuCancel: "Cancel account",
                cancelTitleModal: "CONFIRMATION",
                cancelAccModal: "Do you wish to cancel this account?",
                btnModalConfirm: "Cancel",
                btnModalDelete: "Delete",
                btnModalBack: "Back",
                btnModalEdit: "Edit",
                btnModalDone: "Conclude",
                btnModalConclude: "Conclude",
                btnModalClose: "Close",
                cancelAccMessage: "Account successfuly canceled!",
                userMessageNotFound: "User not found!",
                userMessagePassword: "Wrong password!",
                usersTitle: "MANAGE USERS",
                usersLbl: "Users:",
                interventionsTitle: "MANAGE INTERVENTIONS",
                interventionsLbl: "Interventions:",
                usersActive: "Active",
                usersInactive: "Inactive",
                thdUsersName: "Name",
                thdUsersStatus: "Status",
                thdUsersLastAccess: "Last access",
                thdUsersActions: "Actions",
                thdInterventionsDesc: "Description",
                thdInterventionsDate: "Date",
                thdInterventionsAction: "Actions",
                btnDetails: "Details",
                btnRemove: "Cancel",
                btnDelete: "Delete",
                lastLoginNever: "Never",
                userDeleted: "User deleted!",
                modalDetailsTitle: "USER DETAILS",
                modalDetailsName: "Name: ",
                modalDetailsNif: "ITIN: ",
                modalDetailsType: "Type: ",
                modalDetailsEmail: "E-mail: ",
                modalDetailsMobile: "Mobile: ",
                modalDetailsBdate: "Birth date: ",
                modalDetailsNotifications: "Notifications subscribed: ",
                modalNotifTrue: "Yes",
                modalNotifFalse: "No",
                apiaryAllTitle: "APIARIES",
                lblCardApiary: "Apiary ",
                lblCardApiaryBtn: "Apiary details",
                hivesAllTitle: "ALL HIVES",
                devicesAllTitle: "HIVE LOCATION",
                lblCardHive: "Hive ",
                lblCardInterventionsBtn: "Manage interventions",
                lblCardDeleteBtn: "Delete apiary",
                lblCardEditBtn: "Edit apiary",
                lblCardDeviceBtn: "Hives",
                lblDetailsUser: "Details",
                lblCancelUser: "Cancel",
                lblDelete: "Delete",
                lblUnregister: "Unregister",
                lblAssign: "Assign",
                modalApiary: "APIARY DETAILS",
                modalApiaryLocation: "Location: ",
                modalApiaryAddress: "Address: ",
                modalApiaryObservations: "Observations: ",
                modalApiaryRegDate: "Registration date: ",
                modalIntervention: "INTERVENTION DETAILS",
                modalNextInterventions: "NEXT INTERVENTIONS DETAILS",
                modalInterventionDescription: "Description: ",
                modalInterventionObservations: "Observations: ",
                modalInterventionType: "Type: ",
                formNewApiaryTitle: "NEW APIARY",
                formEditApiaryTitle: "EDIT APIARY",
                formNewApiaryLocation: "Location",
                formNewApiaryAddress: "Address",
                formNewApiaryObservations: "Observations",
                mesNewApiarySuccess: "New apiary successfuly created!",
                formNewDeviceTitle: "REGISTER DEVICE",
                formNewDeviceID: "New device ID",
                formAddDeviceID: "Type or paste device ID",
                formNewDeviceBtnGenerate: "GET ID",
                formNewInterventionTitle: "SCHEDULE INTERVENTION",
                formNewInterventionDate: "Date and time",
                formNewInterventionDescription: "Description",
                formNewInterventionObservations: "Observations",
                formNewInterventionNotifications: "Receive notifications?",
                formNewInterventionType1: "Normal",
                formNewInterventionType2: "Important",
                formNewInterventionType3: "Urgent",
                lblStart: "Start: ",
                lblEnd: "End: ",
                lblDiv: " at ",
                lblAlterDateTime: "Select new date and time?",
                mesNewInterventionSuccess: "New intervention successfuly scheduled!",
                mesNewDeviceSuccess: "New device successfully generated!",
                mesRegisterDeviceSuccess: "Device successfully registered!",
                mesRegisterDeviceError: "Device already registered.",
                mesRegisterDeviceNotFound: "Device not found or invalid ID!",
                mesRegisterIDError: "Invalid ID!",
                btnModalGenerate: "Generate",
                newDeviceModal: "Do you wish to generate a new device ID?",
                newDeviceCopyBtn: "Copy",
                newDeviceCopyAlert: "ID copied!",
                newDeviceNoID: "No new ID to copy!",
                deleteTitleModal: "DELETE APIARY",
                deleteApiaryText: "Do you wish to delete this apiary?",
                deleteApiarySuccess: "Apiary successfuly deleted!",
                deleteApiaryFail: "You cannot delete an apiary with hives!",
                btnModalDeleteApiary: "Delete",
                deleteInterventionModalTitle: "DELETE INTERVENTION",
                deleteInterventionModalText: "Do you wish to delete this intervention?",
                deleteInterventionMessage: "Intervention successfully deleted.",
                concludeInterventionMessage: "Intervention concluded.",
                interventionChangeSuccess: "Intervention successfully updated.",
                concludeInterventionModalTitle: "CONCLUDE INTERVENTION",
                concludeInterventionModalText: "Do you wish to conclude this intervention?",
                notifSuccessTitle: "SUCCESS",
                notifErrorTitle: "ERROR",
                notifWarningTitle: "WARNING",
                updateApiarySuccess: "Apiary successfully updated",
                manageDevicesTitle: "MANAGE DEVICES",
                manageDevicesLabel: "Registered devices:",
                thdDevicesID: "Device ID",
                thdDevicesStatus: "State",
                thdDevicesUser: "User",
                thdDevicesApiary: "Apiary",
                notAssignedText: "Not assigned",
                assignedText: "Assigned",
                searchPholderUser: "Search user",
                searchPholderID: "Search ID",
                manageHivesTitle: "MANAGE HIVES",
                manageHivesLabel: "Registered hives:",
                unregisterModalTitle: "UNREGISTER HIVE",
                unregisterModalText: "Do you wish to unregister this hive?",
                btnUnregisterModal: "Unregister",
                btnUnassignModal: "Unassign",
                unregisterMessage: "Device successfuly unregistered!",
                noHives: "No hives resgistered for this user!",
                noHivesInApiary: "No hives assigned to this apiary!",
                lblStatus: "STATE: ",
                hiveDetailsTitle: "HIVE DATA",
                lblBtnMap: "MAP",
                lblLastData: "Last data received: ",
                lblAt: " at ",
                assignHiveTitle: "ASSIGN HIVE",
                assignMessage: "Hive successfully assigned!",
                noDataForHive: "No data for this hive!",
                charTempIn: "Temperature inside",
                charTempOut: "Temperature outside",
                charHumIn: "Relative humidity inside (%)",
                charHumOut: "Relative humidity outside (%)",
                charSound: "Interior sound (db)",
                charWeight: "Weight (kg)",
                lblCardData: "Hive data",
                mesApiaryOperations: "Select option for apiary.",
                notificationsTitle: "EVENTS",
                eventsLabel: "Active hive events:",
                interventionLabel: "Notifications for interventions:",
                noNotifications: "You don't have notifications.",
                hiveText: "HIVE LID OPEN",
                tempText: "INTERIOR TEMPERATURE HIGH",
                humText: "INTERIOR HUMIDITY HIGH",
                weightText: "HARVEST SETPOINT REACHED",
                interText: "INTERVENTION IN THE NEXT DAYS",
                thdEvent: "Notification",
                thdHive: "Hive",
                lblBtnIgnore: "Ignore",
                modalSolveHiveTitle: "SOLVE ANOMALY",
                modalSolveHiveText: "Do you wish to set the anomaly as solved?",
                bntSolveHive: "Solve",
                notifHiveEventSolved: "Hive notification solved.",
                lblMap: "See on map",
                notInterventionPassed: "You have past interventions to conclude.",
                editInterventionTitle: "EDIT INTERVENTION",
                reportTitle: "REPORT PROBLEM",
                reportText: "Your message",
                reportSubject: "Subject",
                reportSuccess: "Report successfully sent!",
                cancelDeviceText: "Do you wish to delete this device? This operation is not reversible!",
                sbarReports: "Messages",
                sbarAllMessages: "All messages",
                sbarNewMessages: "New messages",
                sbarSendMessage: "Send message",
                allReportsTitle: "ALL MESSAGES",
                newMessagesTitle: "NEW MESSAGES",
                messagesLbl: "Messages",
                tdFrom: "From",
                tdDate: "Date",
                btnAnswer: "Answer",
                btnAnswered: "Answered",
                modalMessageTitle: "MESSAGE",
                modalMessageFrom: "From: ",
                modalMessageSubject: "Subject: ",
                modalMessageEmail: "e-mail: ",
                modalMessageText: "Message: ",
                modalBtnAnswer: "Answer",
                msgAnswer: "Reply sent successfully!",
                tempInSp: "Inside temperature setpoint",
                humInSp: "Inside humidity setpoint",
                weightSp: "Weight setpoint",
                editHiveTitle: "EDIT HIVE",
                mesEditSuccess: "Change setpoint data.",
                mesEditSubmited: "Setpoint values successfully updated.",
                myDashTitle: "MY DASHBOARD",
                sbarDash: "Dashboard",
                myDash: "My dashboard",
                cardNoEvents: "You don't have active notifications.",
                dashNotif: "Events",
                dashNotifBtn: "Go to events",
                dashMess: "Messages",
                dashMessBtn: "Go to messages",
                dashTotalApiaries: "Total apiaries",
                dashApiariesBtn: "Add apiaries",
                dashHivesBtn: "Add hives",
                dashTotalHives: "Total hives",
                dashInterventions: "Interventions",
                dashEventsTextYes: "You have hives needing your attention",
                dashEventsTextNo: "No events",
                dashIntervTextYes: "You have interventions in the next days",
                dashIntervTextNo: "You don't have interventions in the next days",
                dashIntervBtn: "Go to interventions",
                nextInterventionsTitle: "NEXT INTERVENTIONS",
                modalDetaisNextInterv: "SCHEDULE INFO",
                modalDetaisApiaryInfo: "APIARY INFO",
                modalDetaisInterventionInfo: "INTERVENTION INFO",
                modalDetaisNextSD: " Starts:",
                modalDetaisNextED: " Ends:",
                btnModalMore: "More details",
                warnMap: "This device is not yet operating!",
                notInterventionClick: "Choose an intervention to edit or get details.",

            }
        }
    }
}
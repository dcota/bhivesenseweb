export default {
    data() {
        return {
            pt: {
                spinnerTxt: "Aguarde por favor...",
                sbarAccLabel: 'Conta',
                sbarAccLogin: 'Login',
                sbarAccNew: "Criar conta",
                sbarUsers: "Utilizadores",
                sbarUsersManage: "Gerir utilizadores",
                sbarDevices: "Dispositivos",
                sbarDevicesManage: "Gerir dispositivos",
                sbarDevicesNew: "Registar dispositivo",
                sbarApiaries: "Apiários",
                sbarApiariesAll: "Ver todos",
                sbarApiariesNew: "Criar apiário",
                sbarApiariesDelete: "Eliminar apiário",
                sbarApiariesAddHive: "Adicionar colmeia",
                sbarApiariesRemoveHive: "Remover colmeia",
                sbarApiariesProblem: "Reportar problema",
                sbarHives: "Colmeias",
                sbarHivesNew: "Adicionar nova colmeia",
                sbarHivesAll: "Gerir colmeias",
                sbarAnalytics: "Analíticas",
                sbarAnalyticsLast: "Últimos valores",
                sbarAnalyticsWeek: "Semanal",
                sbarAnalyticsMonth: "Mensal",
                newAccFormTitle: "CRIAR CONTA",
                newAccFnamePh: "Primeiro nome",
                newAccLnamePh: "Último name",
                newAccNamePh: "Nome completo",
                newAccNifPh: "NIF",
                newAccEmailPh: "e-mail",
                newAccMobilePh: "Telemóvel",
                newAccBdatePh: "Data nascimento",
                newAccUserPh: "username",
                newAccPassPh: "password",
                selectLbl: "Tipo",
                typeOp1: "Individual",
                typeOp2: "Empresa",
                typeOp3: "Cooperativa",
                newAccSubs: "Subscrever notificações?",
                btnSubmit: "SUBMETER",
                btnCancel: "CANCELAR",
                btnClean: "LIMPAR",
                btnBack: "VOLTAR",
                btnClose: "FECHAR",
                btnNew: "NOVA",
                btnSchedule: "AGENDAR",
                btnAssign: "ASSOCIAR",
                btnNotifications: "Notificações",
                profilePhoto: "Foto de perfil",
                photoButton: "Ficheiro",
                mesNewAccount: 'Conta criada com sucesso.',
                mesUserExists: 'Utilizador existente.',
                mesProblem: 'Erro de servidor. Tente de novo...',
                mesFields: 'Preencha todos os campos.',
                mesEmptyID: "ID inválido ou inexistente!",
                mesFieldsIntervention: 'Datas inválidas ou campos não preenchidos (descrição ou tipo)',
                mesFieldsApiary: 'Preencha os campos local e endereço.',
                mesChangeSuccess: "Alterações registadas com sucesso!",
                mesChangeInvalid: "Valores inválidos, por favor confira...",
                mesNoApiaries: "Não foram encontrados apiários para este utilizador...",
                mesNoInterventions: "Não há intervenções agendadas para este apiário.",
                accFormTitle: "DETALHES DA CONTA",
                userMenuProfile: "Gerir conta",
                userMenuLogout: "Logout",
                userMenuCancel: "Cancelar conta",
                cancelTitleModal: "CONFIRMAÇÃO",
                cancelAccModal: "Deseja cancelar esta conta?",
                btnModalConfirm: "Cancelar",
                btnModalDelete: "Eliminar",
                btnModalBack: "Voltar",
                btnModalEdit: "Editar",
                btnModalDone: "Concluir",
                btnModalConclude: "Concluir",
                btnModalClose: "Fechar",
                cancelAccMessage: "Conta cancelada com sucesso!",
                userMessageNotFound: "Utilizador não encontrado!",
                userMessagePassword: "Password errada!",
                usersTitle: "GESTÃO DE UTILIZADORES",
                usersLbl: "Utilizadores:",
                usersActive: "Ativo",
                usersInactive: "Inativo",
                interventionsTitle: "GESTÃO DE INTERVENÇÕES",
                interventionsLbl: "Intervenções:",
                thdUsersName: "Nome",
                thdUsersStatus: "Estado",
                thdUsersLastAccess: "Último acesso",
                thdUsersActions: "Ações",
                thdInterventionsDesc: "Descrição",
                thdInterventionsDate: "Data",
                thdInterventionsAction: "Ações",
                btnDetails: "Detalhes",
                btnRemove: "Remover",
                btnDelete: "Eliminar",
                lastLoginNever: "Nunca",
                userDeleted: "Utilizador eliminado!",
                modalDetailsTitle: "DETALHES DO UTILIZADOR",
                modalDetailsName: "Nome: ",
                modalDetailsNif: "NIF: ",
                modalDetailsType: "Tipo: ",
                modalDetailsEmail: "E-mail: ",
                modalDetailsMobile: "Telemóvel: ",
                modalDetailsBdate: "Data nascimento: ",
                modalDetailsNotifications: "Notificações subscritas: ",
                modalNotifTrue: "Sim",
                modalNotifFalse: "Não",
                apiaryAllTitle: "APIÁRIOS",
                hivesAllTitle: "COLMEIAS NO APIÁRIO",
                devicesAllTitle: "LOCALIZAÇÃO DA COLMEIA",
                lblCardHive: "Colmeia",
                lblCardApiary: "Apiário ",
                lblCardApiaryBtn: "Detalhes do apiário",
                lblCardInterventionsBtn: "Gerir intervenções",
                lblCardDeleteBtn: "Eliminar apiário",
                lblCardEditBtn: "Editar apiário",
                lblCardDeviceBtn: "Colmeias",
                lblDetailsUser: "Detalhes",
                lblCancelUser: "Cancelar",
                lblDelete: "Eliminar",
                lblUnregister: "Remover registo",
                lblAssign: "Associar",
                modalApiary: "DETALHES DO APIÁRIO",
                modalApiaryAddress: "Endereço: ",
                modalApiaryLocation: "Localização: ",
                modalApiaryObservations: "Observações: ",
                modalApiaryRegDate: "Data de registo: ",
                modalIntervention: "DETALHES DA INTERVENÇÃO",
                modalNextInterventions: "DETALHES DAS PRÓXIMAS INTERVENÇÕES",
                modalInterventionDescription: "Descrição: ",
                modalInterventionObservations: "Observações: ",
                modalInterventionType: "Tipo: ",
                formNewApiaryTitle: "CRIAR APIÁRIO",
                formEditApiaryTitle: "EDITAR APIÁRIO",
                formNewApiaryLocation: "Local",
                formNewApiaryAddress: "Endereço",
                formNewApiaryObservations: "Observações",
                mesNewApiarySuccess: "Novo apiário criado com sucesso!",
                formNewDeviceTitle: "REGISTAR DISPOSITIVO",
                formNewDeviceID: "ID do novo dispositivo",
                formNewDeviceBtnGenerate: "OBTER ID",
                formNewInterventionTitle: "AGENDAR INTERVENÇÃO",
                formNewInterventionDate: "Data e hora",
                formNewInterventionDescription: "Descrição",
                formNewInterventionObservations: "Observações",
                formNewInterventionNotifications: "Receber notificação?",
                formNewInterventionType1: "Normal",
                formNewInterventionType2: "Importante",
                formNewInterventionType3: "Urgente",
                lblStart: "Início: ",
                lblEnd: "Fim: ",
                lblDiv: " às ",
                lblAlterDateTime: "Alterar a data e a hora?",
                mesNewInterventionSuccess: "Intervenção agendada com sucesso!",
                mesNewDeviceSuccess: "Novo dispositivo gerado com sucesso!",
                mesRegisterDeviceSuccess: "Dispositivo registado com sucesso!",
                mesRegisterDeviceError: "Dispositivo já registado.",
                mesRegisterDeviceNotFound: "Dispositivo não encontrado ou ID inválido!",
                mesRegisterIDError: "ID inválido!",
                btnModalGenerate: "Gerar",
                newDeviceModal: "Deseja obter um novo ID de dispositivo?",
                newDeviceCopyBtn: "Copiar",
                newDeviceCopyAlert: "ID copiado!",
                newDeviceNoID: "Novo ID inexistente!",
                deleteTitleModal: "ELIMINAR APIÁRIO",
                deleteApiaryText: "Deseja eliminar este apiário?",
                deleteApiaryFail: "Não pode eliminar um apiário com colmeias associadas!",
                btnModalDeleteApiary: "Eliminar",
                deleteInterventionModalTitle: "ELIMINAR INTERVENÇÃO",
                deleteInterventionModalText: "Deseja eliminar esta intervenção?",
                deleteInterventionMessage: "Intervenção eliminada com sucesso.",
                interventionChangeSuccess: "Intervenção alterada com sucesso.",
                concludeInterventionMessage: "Intervenção concluida.",
                concludeInterventionModalTitle: "CONCLUIR INTERVENÇÃO",
                concludeInterventionModalText: "Deseja dar por concluida esta intervenção?",
                notifSuccessTitle: "SUCESSO",
                notifErrorTitle: "ERRO",
                notifWarningTitle: "ATENÇÃO",
                updateApiarySuccess: "Apiário atualizado com sucesso",
                manageDevicesTitle: "GERIR DISPOSITIVOS",
                manageDevicesLabel: "Dispositivos registados:",
                thdDevicesID: "ID dispositivo",
                thdDevicesStatus: "Estado",
                thdDevicesUser: "Utilizador",
                thdDevicesApiary: "Apiário",
                notAssignedText: "Não associado",
                assignedText: "Associado",
                searchPholderUser: "Pesquisar utilizador",
                searchPholderID: "Pesquisar ID",
                manageHivesTitle: "GERIR COLMEIAS",
                manageHivesLabel: "Colmeias resgistadas:",
                unregisterModalTitle: "REMOVER REGISTO DE COLMEIA",
                unregisterModalText: "Deseja remover o registo desta colmeia?",
                btnUnregisterModal: "Remover",
                btnUnassignModal: "Desassociar",
                unregisterMessage: "Registo removido com sucesso!",
                noHives: "Não há colmeias resgistadas para este utilizador!",
                noHivesInApiary: "Apiário sem colmeias associadas!",
                lblStatus: "ESTADO: ",
                hiveDetailsTitle: "DADOS DA COLMEIA",
                lblBtnMap: "MAPA",
                lblLastData: "Últimos dados recebidos: ",
                lblAt: " às ",
                assignHiveTitle: "ASSOCIAR COLMEIA",
                assignMessage: "Colmeia associada com sucesso!",
                noDataForHive: "Sem dados para a colmeia!",
                charTempIn: "Temperatura interior",
                charTempOut: "Temperatura exterior",
                charHumIn: "Humidade relativa interior (%)",
                charHumOut: "Humidity relativa exterior (%)",
                charSound: "Som interior (db)",
                charWeight: "Peso(kg)",
                lblCardData: "Dados da colmeia",
                mesApiaryOperations: "Selecione a opção para o apiário.",
                notificationsTitle: "EVENTOS",
                eventsLabel: "Eventos em colmeias:",
                interventionLabel: "Notificação de intervenção:",
                noNotifications: "Não tem notificações.",
                hiveText: "TAMPA DA COLMEIA ABERTA",
                interText: "INTERVENÇÃO NOS PRÓXIMOS DIAS",
                tempText: "TEMPERATURA INTERIOR ELEVADA",
                humText: "HUMIDADE INTERIOR ELEVADA",
                weightText: "VALOR DE COLHEITA ATINGIDO",
                thdEvent: "Notificação",
                thdHive: "Colmeia",
                lblBtnIgnore: "Ignorar",
                modalSolveHiveTitle: "RESOLVER ANOMALIA",
                modalSolveHiveText: "Deseja dar a anomalia como resolvida?",
                bntSolveHive: "Resolver",
                notifHiveEventSolved: "Notificação de colmeia resolvida.",
                lblMap: "Ver no mapa",
                notInterventionPassed: "Tem intervenções passadas por concluir.",
                editInterventionTitle: "EDITAR INTERVENÇÃO",
                reportTitle: "REPORTAR PROBLEMA",
                reportText: "Mensagem",
                reportSubject: "Assunto",
                reportSuccess: "Mensagem enviada com sucesso!",
                cancelDeviceText: "Deseja eliminar este dispositivo? Esta operação é irreversível!",
                sbarReports: "Mensagens",
                sbarNewMessages: "Novas mensagens",
                sbarAllMessages: "Ver mensagens",
                sbarSendMessage: "Enviar messagem",
                allReportsTitle: "TODAS AS MENSAGENS",
                newMessagesTitle: "NOVAS MENSAGENS",
                messagesLbl: "Mensagens",
                tdFrom: "Remetente",
                tdDate: "Data",
                btnAnswer: "Responder",
                btnAnswered: "Concluido",
                modalMessageTitle: "MENSAGEM",
                modalMessageFrom: "Remetente: ",
                modalMessageSubject: "Assunto: ",
                modalMessageEmail: "e-mail: ",
                modalMessageText: "Mensagem: ",
                modalBtnAnswer: "Resposta",
                msgAnswer: "Resposta enviada com sucesso",
                tempInSp: "Setpoint temperatura interior",
                humInSp: "Setpoint humidade interior",
                weightSp: "Setpoint peso",
                editHiveTitle: "EDITAR COLMEIA",
                mesEditSuccess: "Altere os dados de setpoint.",
                mesEditSubmited: "Dados alterados com sucesso.",
                myDashTitle: "O MEU DASHBOARD",
                sbarDash: "Dashboard",
                myDash: "O meu dashboard",
                cardNoEvents: "Não tem notificações ativas",
                dashNotif: "Notificações",
                dashNotifBtn: "Ir para eventos",
                dashMess: "Mensagens",
                dashMessBtn: "Ir para mensagens",
                dashTotalHives: "Total de apiários",
                dashHivesBtn: "Ir para apiários",
                dashTotalApiaries: "Total de apiários",
                dashApiariesBtn: "Ir para apiários",
                dashTotalHives: "Total de colmeias",
                dashInterventions: "Intervenções",
                dashEventsTextYes: "Tem colmeias que necessitam de atenção",
                dashEventsTextNo: "Sem eventos",
                dashIntervTextYes: "Tem intervenções nos próximos dias",
                dashIntervTextNo: "Não tem intervenções nos próximos dias",
                nextInterventionsTitle: "PRÓXIMAS INTERVENÇÕES",
                modalDetaisNextInterv: "INFORMAÇÃO DE AGENDAMENTO",
                modalDetaisApiaryInfo: "INFORMAÇÃO DO APIÁRIO",
                modalDetaisNextSD: " Início:",
                modalDetaisNextED: " Fim:",
                btnModalMore: "Detalhes",
                warnMap: "Este dispositivo ainda não se encontra em funcionamento!",
                notInterventionClick: "Escolha uma intervenção para editar ou obter detalhes.",
            }
        }
    }
}
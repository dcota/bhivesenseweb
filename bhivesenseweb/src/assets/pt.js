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
                sbarHivesNew: "Registar dispositivo",
                sbarHivesAll: "Ver todas",
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
                btnNew: "NOVA",
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
                hivesAllTitle: "COLMEIAS",
                devicesAllTitle: "LOCALIZAÇÃO DA COLMEIA",
                lblCardHive: "Hive ",
                lblCardApiary: "Apiário ",
                lblCardApiaryBtn: "Detalhes do apiário",
                lblCardInterventionsBtn: "Gerir intervenções",
                lblCardDeleteBtn: "Eliminar apiário",
                lblCardEditBtn: "Editar apiário",
                lblCardDeviceBtn: "Colmeias",
                lblDetailsUser: "Detalhes",
                lblCancelUser: "Cancelar",
                lblDelete: "Eliminar",
                modalApiary: "DETALHES DO APIÁRIO",
                modalApiaryAddress: "Endereço: ",
                modalApiaryObservations: "Observações: ",
                modalApiaryRegDate: "Data de registo: ",
                modalIntervention: "DETALHES DA INTERVENÇÃO",
                modalInterventionDescription: "Descrição: ",
                modalInterventionObservations: "Observações: ",
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
                formNewInterventionType1: "Tipo 1",
                formNewInterventionType2: "Tipo 2",
                formNewInterventionType3: "Tipo 3",
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
            }
        }
    }
}
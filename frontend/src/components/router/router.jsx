
import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import Inbox from '../pages/Inbox'
import Drafts from '../pages/Drafts'
import Sent from '../pages/Sent'
import Register from '../auth/Register'
import Login from '../auth/Login'
import ComposeEmail from '../compose_mail/ComposeEmail'
import REmail from '../RecentEmails'
import ImportantEmailsPage from '../ImportantEmails'
import AdminLogin from '../Admin/AdminLogin'
import AdminDashboard from '../Admin/AdminDashboard'
import AdminUsers from '../Admin/AdminUsers'
import AdminProtect from '../Admin/AdminProtect'
import SendEmails from '../Admin/SendEmails'
import DraftEmails from '../Admin/DraftEmails'
import SingleEmail from '../SingleEmail'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Inbox />
            },
            {
                path: 'drafts',
                element: <Drafts />
            },
            {
                path: 'sent',
                element: <Sent />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'compose',
                element: <ComposeEmail />
            },
            {
                path: 'recent-emails',
                element: <REmail />
            },
            {
                path: 'important-emails',
                element: <ImportantEmailsPage />
            },
            {
                path:'emails/:messageId',
                element:<SingleEmail />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminProtect><AdminLogin /></AdminProtect>,
    },
    {
        path: '/admin/dashboard',
        element: <AdminProtect>
            <AdminDashboard />
        </AdminProtect>,
        children: [
            {
                path: 'users',
                element: <AdminProtect>
                    <AdminUsers />
                </AdminProtect>
            },
            {
                path:'sentemails',
                element: <AdminProtect>
                    <SendEmails />
                </AdminProtect>
            },
            {
                path:'drafts',
                element: <AdminProtect>
                    <DraftEmails />
                </AdminProtect>
            }
        ]
    }
])
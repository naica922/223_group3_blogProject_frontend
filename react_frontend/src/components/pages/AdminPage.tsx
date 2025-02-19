import { useNavigate } from 'react-router-dom';
const AdminPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Admin Page</h1>
            <button onClick={() => navigate('/users')}>Users</button>
        </div>
    )
}
export default AdminPage;
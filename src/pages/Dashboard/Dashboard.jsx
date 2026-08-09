import callAPI from "../../utils/callAPI";

function Dashboard() {
    const logout = async () => {
        const refresh = localStorage.getItem("refresh");

        await callAPI(
            "POST",
            "auth/logout/",
            {
                refresh,
            }
        );

        localStorage.clear();

        window.location.href = "/login";
    };

    return (
        <div>

            <h1>

                Dashboard

            </h1>

            <button
                onClick={logout}
            >
                Logout
            </button>

        </div>
    );
}

export default Dashboard;
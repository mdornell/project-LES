import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: "$primary" }}>
            <div className="p-4 rounded shadow text-center" style={{ backgroundColor: "$background", width: "100%", maxWidth: "400px" }}>
                <div className="mb-3">
                    <img src="/images/logo.png" alt="Logo" className="rounded-circle" style={{ width: "80px", height: "80px" }} />
                </div>
                <form method="post">
                    <div className="mb-3 text-start">
                        <label htmlFor="username" className="form-label">E-mail:</label>
                        <input type="email" id="username" name="username" className="form-control" required />
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="password" className="form-label">Senha:</label>
                        <input type="password" id="password" name="password" className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Entrar</button>
                </form>
            </div>
        </div>

    );
}

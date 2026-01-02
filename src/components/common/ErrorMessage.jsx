function ErrorMessage({ message }) {
    return (
        <p
            style={{
                margin: "12px 0",
                color: "#d32f2f",
                fontWeight: "500",
                fontSize: "14px",
            }}
        >
            {message}
        </p>
    );
}

export default ErrorMessage;

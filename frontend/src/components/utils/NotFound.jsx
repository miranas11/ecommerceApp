import React from "react";

const NotFound = () => {
    const styles = {
        container: {
            textAlign: "center",
            marginTop: "50px",
            fontFamily: "Arial, sans-serif",
        },
        title: {
            fontSize: "2rem",
            color: "#333",
        },
        message: {
            fontSize: "1rem",
            color: "#777",
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>404 - Page Not Found</h2>
            <p style={styles.message}>
                The page you are looking for does not exist.
            </p>
        </div>
    );
};

export default NotFound;

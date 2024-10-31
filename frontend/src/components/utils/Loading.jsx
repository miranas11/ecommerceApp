import React from "react";
import { Puff } from "react-loader-spinner";

const Loading = () => {
    const loaderStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
    };

    return (
        <div style={loaderStyle}>
            <Puff
                visible={true}
                height="80"
                width="80"
                color="#C3A576"
                ariaLabel="puff-loading"
            />
        </div>
    );
};

export default Loading;

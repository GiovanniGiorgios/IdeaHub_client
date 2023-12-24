import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import DeviceItem from "./DeviceItem";
import { Context } from "..";

const DeviceList = observer(() => {
    const {device} = useContext(Context)

    return (
        <>
            {device.devices.map(device => 
                <DeviceItem key={device.id} device={device} />
            )}
        </>
        // <div style={{display: "flex", flexDirection: 'row', flexWrap: 'wrap'}}> 
        // </div>
    );
});

export default DeviceList;
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Stack,
    FormControl,
    Select, MenuItem
} from '@mui/material';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';




const Preview = ({ children }) => {
    const DEVICE_LIST = [
        { id: 'iPhone X', label: 'iPhone X', colors: ['black', 'silver'], defaults: { width: 375, height: 812, zoom: 1 } },
        { id: 'iPhone 8', label: 'iPhone 8', colors: ['black', 'silver', 'gold'], defaults: { width: 375, height: 667, zoom: 1 } },
        { id: 'iPhone 8 Plus', label: 'iPhone 8 Plus', colors: ['black', 'silver', 'gold'], defaults: { width: 414, height: 736, zoom: 1 } },
        { id: 'iPhone 5s', label: 'iPhone 5s', colors: ['black', 'silver', 'gold'], defaults: { width: 320, height: 568, zoom: 1 } },
        { id: 'iPhone 5c', label: 'iPhone 5c', colors: ['white', 'red', 'yellow', 'green', 'blue'], defaults: { width: 320, height: 568, zoom: 1 } },
        { id: 'iPhone 4s', label: 'iPhone 4s', colors: ['black', 'silver'], defaults: { width: 320, height: 480, zoom: 1 } },
        { id: 'Galaxy Note 8', label: 'Galaxy Note 8', colors: [], defaults: { width: 412, height: 846, zoom: 1 } },
        { id: 'Nexus 5', label: 'Nexus 5', colors: [], defaults: { width: 360, height: 640, zoom: 1 } },
        { id: 'Lumia 920', label: 'Lumia 920', colors: ['black', 'white', 'yellow', 'red', 'blue'], defaults: { width: 332, height: 768, zoom: 1 } },
        { id: 'Samsung Galaxy S5', label: 'Samsung Galaxy S5', colors: ['white', 'black'], defaults: { width: 360, height: 640, zoom: 1 } },
        { id: 'HTC One', label: 'HTC One', colors: [], defaults: { width: 360, height: 640, zoom: 1 } },
        { id: 'iPad Mini', label: 'iPad Mini', colors: ['black', 'silver'], defaults: { width: 768, height: 1024, zoom: 0.8 } },
        { id: 'MacBook Pro', label: 'MacBook Pro', colors: [], defaults: { width: 1280, height: 800, zoom: 0.6 } }
    ];

    const [device, setDevice] = useState({ name: 'iPhone 8', orientaion: "portrait", color: "black" });
    const [availableColors, setAvailableColors] = useState(['black', 'silver', 'gold'])


    return <Stack sx={{ width: "100%" }} alignItems={"center"}>
        <Stack sx={{ mb: 4, p: 2, width: "100%" }}>
            <Stack alignItems={"center"} direction={"row"} gap={3}>
                <Typography variant="body2">Device:</Typography>
                <FormControl size="small" sx={{ minWidth: 240 }}>
                    <Select
                        labelId="device-select-label"
                        id="device-select"
                        variant="standard"
                        value={device.name}
                        label="Device"
                        onChange={e => {
                            const sel = DEVICE_LIST.find(d => d.id === e.target.value);
                            if (!sel) return;
                            setDevice({
                                name: sel.id,
                                orientaion: 'portrait',
                                color: (sel.colors && sel.colors.length) ? sel.colors[0] : 'black'
                            });
                            setAvailableColors(sel.colors)
                        }}
                    >
                        {DEVICE_LIST.map(d => (
                            <MenuItem key={d.id} value={d.id}>
                                {d.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Typography variant="body2">Color:</Typography>
                    {availableColors && availableColors.length ? (
                        availableColors.map(col => {
                            const id = `color-${col}-${device.name.replace(/\s+/g, '-')}`;
                            const selected = device.color === col;
                            return (
                                <label key={id} htmlFor={id} style={{ cursor: 'pointer' }}>
                                    <input
                                        id={id}
                                        type="radio"
                                        name="device-color"
                                        value={col}
                                        checked={selected}
                                        onChange={() => setDevice(d => ({ ...d, color: col }))}
                                        style={{ display: 'none' }}
                                    />
                                    <span style={{
                                        display: 'inline-block',
                                        width: 18,
                                        height: 18,
                                        borderRadius: '50%',
                                        background: col,
                                        border: selected ? '3px solid rgba(25,118,210,0.9)' : '1px solid rgba(0,0,0,0.2)',
                                        boxSizing: 'border-box',
                                        marginRight: 8
                                    }} />
                                </label>
                            );
                        })
                    ) : (
                        <Typography variant="body2">Default</Typography>
                    )}
                </Box>
            </Stack>
        </Stack>
        <DeviceFrameset device={device.name} color={device.color} landscape={device.orientaion === "landscape"}>
           {children}
        </DeviceFrameset>
    </Stack>
};

export default Preview;


import React, { useState } from "react";
import { Chips } from "primereact/chips";

export default function SeparatorDemo() {
    const [value, setValue] = useState(['a','b']);

    return (
        <div className="card p-fluid">
            <Chips value={value} onChange={(e) => setValue(e.value)} separator="," />
        </div>
    )
}
        
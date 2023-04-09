
import React from 'react'; 
import { Card } from 'primereact/card';

export default function CardComponent({title,count}) {
    // console.log({title});
    return (
        <div className="card">
            <Card title={title}>
                <p className="m-0">
                    {count}
                </p>
            </Card>
        </div>
    )
}
        
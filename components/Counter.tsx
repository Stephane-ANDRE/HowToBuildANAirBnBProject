"use client"

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// This component creates a simple counter with increment and decrement functionality.
export function Counter({ name }: { name: string }) {
    // State to keep track of the current count.
    const [amount, setAmount] = useState(0);

    // Function to increase the count by 1.
    function increase() {
        setAmount(amount + 1);
    };

    // Function to decrease the count by 1, ensuring it doesn't go below 0.
    function decrease() {
        if (amount > 0) {
            setAmount(amount - 1);
        }
    };

    // Render the counter UI, including buttons to increase/decrease the count and display the current count.
    return (
        <div className="flex items-center gap-x-4">
            {/* Hidden input to store the counter value, useful for form submissions. */}
            <input type="hidden" name={name} value={amount} />
            {/* Button to decrease the count. */}
            <Button variant="outline" size="icon" type="button" onClick={decrease}>
                <Minus className="h-4-w4 text-primary" />
            </Button>
            {/* Display the current count. */}
            <p className="font-medium text-lg">{amount}</p>
            {/* Button to increase the count. */}
            <Button variant="outline" size="icon" type="button" onClick={increase}>
                <Plus className="h-4-w4 text-primary" />
            </Button>
        </div>
    )
}

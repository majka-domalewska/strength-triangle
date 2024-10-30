import React from 'react';

const TestAsync: React.FC = () => {
    const testFunction = async () => {
        const result = await new Promise((resolve) => {
            setTimeout(() => resolve("Success!"), 1000);
        });
        console.log(result);
    };

    return (
        <div>
            <button onClick={testFunction}>Test Async</button>
        </div>
    );
};

export default TestAsync;
function copyPhoneNumberToClipboard() {
    const phoneNumber = "+12707704034";
    navigator.clipboard.writeText(phoneNumber)
        .then(() => {
            window.alert("Copied phone number to clipboard!");
        })
        .catch((error) => {
            window.alert("Could not copy phone number to clipboard.");
            console.error(error);
        });
}

const formatResponse = (response) => {
    const steps = response.split('\n');
    return (
        // <ol>
        //     {steps.map((step, index) => (
        //         <><li key={index}>{step}</li><br /></>
        //     ))}
        // </ol>
        <div className="whitespace-pre-wrap">
            <pre className="whitespace-pre-line font-[Quicksand] font-medium">{response}</pre>
        </div>
    );
};

export { copyPhoneNumberToClipboard, formatResponse }
import axios from 'axios';

async function test() {
    const pdfUrl = "https://image-static.collegedunia.com/public/image/Maharashtra_Board_Class_12_Chemistry_Question_Paper_with_Solutions_PDF_1__e179a7bc5f6157830cd92ec067499d7d.pdf";
    try {
        const response = await axios.get(pdfUrl, {
            responseType: "stream",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Referer": "https://ncert.nic.in/",
            },
            timeout: 5000
        });
        console.log("Success! Status:", response.status);
        process.exit(0);
    } catch (error) {
        console.error("Error:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
        }
        process.exit(1);
    }
}

test();

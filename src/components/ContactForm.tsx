import { useRef, useState, type SubmitEventHandler } from "react";
import toast, { Toaster } from "react-hot-toast";
;

const ContactForm = () => {
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async(e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        if (!formData.get("email")){
            toast.error("Please enter your email!");
            return;
        }

        // hit endpoint
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        toast.success("Thanks! I'll be in touch.", {
            duration: 4000,
        });
        formRef.current?.reset();
    }

    return (
        <>
            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
                <h2>Let's Connect</h2>
                <p>Reach out below for inquiries, quotes, or collabs.</p>
                <label>
                    Your Email:
                    <input 
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="durp@durp.com"
                    />
                </label>
                <button className="link" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "on it's way" : "senderoo"}
                </button>
            </form>
            <Toaster />
        </>
    );
};

export default ContactForm;
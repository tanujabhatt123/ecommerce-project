export const modifyFormData = (formData) => {
    let modifyObject = {}
    let isFormValid = false;

    console.log(formData);

    for (const formControl of formData) {
        modifyObject[formControl.name] = formControl.value

        console.log(formControl);
        console.log(formControl.required && formControl.value !== "");
        if (formControl.required && formControl.value !== "") {
            isFormValid = true;
        } else {
            isFormValid = false
            break;
        }
    }

    return {
        isFormValid,
        modifyObject
    }
}
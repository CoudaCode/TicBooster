function nextStep(step) {
    document.querySelectorAll('.step').forEach(function(stepElement) {
        stepElement.classList.add('hidden');
    });
    document.getElementById('step' + step).classList.remove('hidden');
    updateProgress(step);
}

function previousStep(step) {
    document.querySelectorAll('.step').forEach(function(stepElement) {
        stepElement.classList.add('hidden');
    });
    document.getElementById('step' + step).classList.remove('hidden');
    updateProgress(step);
}

function updateProgress(step) {
    const indicators = document.querySelectorAll('.flex span');
    indicators.forEach((indicator, index) => {
        if (index < step) {
            indicator.classList.remove('bg-gray-300');
            indicator.classList.add('bg-blue-500');
        } else {
            indicator.classList.remove('bg-blue-500');
            indicator.classList.add('bg-gray-300');
        }
    });
}

document.getElementById('multiStepForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Formulaire soumis !');
});
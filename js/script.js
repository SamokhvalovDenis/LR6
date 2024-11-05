const schedule = [
    { subject: "Математика", start: "09:00", teacher: "" },
    { subject: "Фізика", start: "11:00", teacher: "Юра" },
    { subject: "Інформатика", start: "13:50", teacher: "Сидоров" },
    { subject: "Історія", start: "15:00", teacher: "Коваленко" }
];

const pairDuration = 80; 

function updateScheduleInfo() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const scheduleInfoDiv = document.getElementById("scheduleInfo");
    const scheduleTable = document.getElementById("scheduleTable");

    scheduleTable.style.display = "table"; 

    scheduleInfoDiv.innerHTML = ""; 
    schedule.forEach((pair, index) => {
        const [hours, minutes] = pair.start.split(":").map(Number);
        const startTime = hours * 60 + minutes;
        const endTime = startTime + pairDuration;
        let status;

        if (currentTime < startTime) {
            status = "Пари ще не почалися";
        } else if (currentTime >= startTime && currentTime < endTime) {
            status = "Зараз йде пара";
        } else if (currentTime >= endTime && (index + 1 >= schedule.length || currentTime < parseTime(schedule[index + 1].start))) {
            status = `Перерва після ${index + 1} пари`;
        } else {
            status = "Пари закінчилися";
        }

        const teacherInfo = pair.teacher ? pair.teacher : "Інформація про викладача відсутня";

        scheduleInfoDiv.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${pair.subject}</td>
                <td>${pair.start}</td>
                <td>${teacherInfo}</td>
                <td>${status}</td>
            </tr>
        `;
    });
}


function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
}

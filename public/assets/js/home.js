const navDashboard = {
    button: "nav-dashboard",
    view: "view-dashboard"};
const navInbox = {
    button: "nav-inbox",
    view: "view-inbox"};
const navClass = {
    button: "nav-class",
    view: "view-class"};
const navDiscussion = {
    button: "nav-discussion",
    view: "view-discussion"};
const navSchedule = {
    button: "nav-schedule",
    view: "view-schedule"};

const allNav = [navDashboard,navInbox,navClass,navDiscussion,navSchedule];

let current;

function disableTheRest(item){
    let buttonList = document.getElementById(item.button).classList;
    let viewList = document.getElementById(item.view).classList;
    console.log(viewList);
    if(item.button===current){
        buttonList.add("disabled");
        viewList.remove("invisible");
        }
    else {
        buttonList.remove("disabled");
        viewList.add("invisible");
    }
}

function goToNavigation(navigation) {
    current = navigation;
    allNav.forEach(disableTheRest);
}

// remove shimmer in picture
const profilePicture = document.querySelector("#profile-pic");
profilePicture.onload = profilePicture.classList.remove("shine");

// api calls

axios.get('/api/v1/user/profile', {})
    .then(function(response){
        const { user_name: name, user_email: email } = response.data.values;
        const profileName = document.querySelector('#profile-name');
        const profileEmail = document.querySelector('#profile-email');
        const profileNameShimmer = document.querySelector('#name-shimmer');
        const profileEmailShimmer = document.querySelector('#email-shimmer');
        profileName.innerText = name;
        profileEmail.innerText = email;
        profileNameShimmer.remove();
        profileEmailShimmer.remove();
    })
    .catch(function(error) {
        console.log(error.message);
    });

const recyclerView = document.querySelector('#recycler-view');

axios.get('/api/v1/user/sessions', {})
    .then(function(response) {
        let dataToBind = '';
        for (let i = 0; i < response.data.values.length; ++i) {
            const {session_id: sessionId, course_id: courseId, course_name: courseName, session_startdate: sessionStart, session_campus: sessionCampus, session_room: sessionRoom, topic_title: topicTitle, topic_description: topicDescription} = response.data.values[i];
            dataToBind += `<div id="${sessionId}" class="card-content-container">
                                <div class="t-caption">${courseId} - ${courseName}</div>
                                <div class="mt-4 t-body2">${topicTitle}</div>
                                <div class="mt-4 t-caption">${topicDescription}</div>
                                <div class="footer-container">
                                    <div class="mt-8 mr-32 left-right-container">
                                        <i class="mr-8 feather-button-sm" data-feather="clock"></i>
                                        <div class="t-caption">${moment(sessionStart).format('dddd, MMMM Do YYYY, HH:mm')}</div>
                                    </div>
                                    <div class="mt-8 left-right-container">
                                        <i class="mr-8 feather-button-sm" data-feather="map-pin"></i>
                                        <div class="t-caption">${sessionRoom}, ${sessionCampus}</div>
                                    </div>
                                </div>
                            </div>`;
        }
        recyclerView.innerHTML += dataToBind;
        feather.replace();
        for (let i = 0; i < response.data.values.length; ++i) {
            const {session_id: sessionId} = response.data.values[i];
            document.getElementById(sessionId).onclick = () => {
                window.location = '/session?id=' + sessionId;
            };
        }
    })
    .catch(function(error) {
        console.log(error.message);
    });



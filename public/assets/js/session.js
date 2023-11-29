const urlParams = new URLSearchParams(window.location.search);

const title = document.querySelector('#title');
const subtitle = document.querySelector('#subtitle');
const startTalk = document.querySelector('#start-talking');
const jengjengjengjeng = document.querySelector('#transcript');

axios.get('/api/v1/user/profile', {})
    .then(function(response){
        const { user_name: name, user_email: email } = response.data.values;
        const profileName = document.querySelector('#profile-name');
        const profileEmail = document.querySelector('#profile-email');
        profileName.innerText = name;
        profileEmail.innerText = email;
    })
    .catch(function(error) {
        console.log(error.message);
    });

axios.post('/api/v1/session/details', {
    session_id: urlParams.get('id')
})
    .then(function(response) {
        const {course_name: courseName, course_id: courseId, topic_title: topicTitle, lecturer_name: lecturerName, can_talk: canTalk, content} = response.data.values;
        title.innerText = `${courseName}: ${topicTitle}`;
        subtitle.innerText = `${courseId} - ${lecturerName}`;
        startTalk.hidden = canTalk !== 1;
        jengjengjengjeng.innerText = content.slice(1);
    })
    .catch(function(error) {
        window.location = '/home';
    });
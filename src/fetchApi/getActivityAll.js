import axios from 'axios';

function fetchActivity() {
    return axios.get('https://todo.api.devcode.gethired.id/activity-groups');
}

export {fetchActivity};
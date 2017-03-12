export const FETCH_PEOPLE_REQUEST = 'FFETCH_PEOPLE_REQUEST';

export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';



export const SAVE_PEOPLE_REQUEST = 'SAVE_PEOPLE_REQUEST';
function savePeopleRequest () {
	return {type: SAVE_PEOPLE_REQUEST};
}

export const SAVE_PEOPLE_FAILURE = 'SAVE_PEOPLE_FAILURE';	
function savePeopleFailure (error) {
	return {type: SAVE_PEOPLE_FAILURE, error}
}
export const SAVE_PEOPLE_SUCCESS = 'SAVE_PEOPLE_SUCCESS';
function savePeopleSuccess (people) {
	return {type: SAVE_PEOPLE_SUCCESS, people}
}


export function savePeople(people){
	return function (dispatch) {
		dispatch(savePeopleRequest())

		apiClient.savePeople(people)
			.then( (resp) => { dispatch(savePeopleSuccess(people)) })
			.catch( (err) => { dispatch(savePeopleFailure(err)) })
	}
}

const apiClient = {
	count: 1,

	savePeople: function(people) {
		const success = !!(this.count++ % 2);

		return new Promise(function (resolve, reject) {
			setTimeout( () => {
				if(!success) return reject( {success});

				localStorage.people = JSON.stringify(people);
				resolve( {success});
			}, 1000)
		});
	},
}
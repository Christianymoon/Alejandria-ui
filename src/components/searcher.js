const input = document.getElementById('searcher')

input.addEventListener('input', (e) => {
	const value = e.target.value
	const users = document.querySelectorAll('user-card')
	users.forEach(user => {
		if (user.textContent.toLowerCase().includes(value.toLowerCase())) {
			user.style.display = 'block'
		} else {
			user.style.display = 'none'
		}
	})
})
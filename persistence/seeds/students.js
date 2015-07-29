exports.seed = function(knex, Promise) {
	return Promise.all([
		knex('students').del(),
		knex.raw("SELECT setval('students_id_seq', 1)")
	])
		.then(function () {
			return knex.transaction(function (trx) {
				return Promise.all([
					// Inserts seed entries
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: 'b36d235a-0bc8-497e-8f40-48cff3671006', name: 'Jedd AHyoung' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: '29f1408a-359a-42af-86ae-497b925a864d', name: 'Andrea Albright' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: '7b912420-5849-42ab-ad1c-9a7f173a4f1a', name: 'Jennifer Dixon' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: 'c8fcdc80-71a6-4b58-8abe-2ee90ecde08a', name: 'Matthew Giebeig' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: '37d91790-60ca-423a-b860-460b66012e04', name: 'Micky Sakora' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: '897ab144-2974-448d-8025-d710ace81ddd', name: 'Victoria Hall' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: 'e0a89cb4-3d27-48f2-bc33-ecfffc7b60d7', name: 'Tyler Bidwell' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: '7be5ed1c-0531-40ad-a5a3-6a1895ed9427', name: 'David Westmark' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: 'fc603116-bc98-4dde-99c3-66d43ba65622', name: 'Katie Forman' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: '442f3cef-a325-4910-9e15-8a862dabc628', name: 'Sara Woodberry' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: '2871d22f-dce1-4e60-84fb-d79a52ce939e', name: 'Gareth Cales' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: 'a4b089f4-d0c8-458f-bddf-f01089107972', name: 'John Shaw' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: 'c31562b5-9594-4b66-8c7f-3ec1147dd996', name: 'Lindsey Rodan' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: 'c8dd3ab8-507e-438c-8c00-03da1c98bd25', name: 'Shanna Brown' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: '88faef6b-d012-4256-b6dd-d15c49204cfb', name: 'Alex Altman' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: 'e51587df-4728-4889-8949-7f2f686212e1', name: 'John McCourt' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: '239ea152-e646-4a59-9e9c-568c00294056', name: 'Alex Diez-Arguelles' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: 'bbd8bc34-e852-472f-a0f3-ca3429e3fe5b', name: 'Ryanne Smith' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: 'b934dfec-348e-47cc-925b-72b69c365e7a', name: 'Molly Jacobs' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: '2baeeeeb-6afd-4fb0-b9ac-bd7e32c25ea9', name: 'Logan Gelabert' }),
					trx('students').insert({ created_at: pg_date(), updated_at: pg_date(), student_id: 'c4fe3c31-b275-4b4d-a0dd-9991a1033904', name: 'Matt Thibault' })
				])
					.then(function (results) {
						return trx.raw("SELECT setval('students_id_seq', " + (results.length + 1) + ")");
					});
			});
		});
};

function pg_date() {
	return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
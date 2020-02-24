/*
	@FieldId	: int
	@FieldValue	: JSON
	@status		: "0x00: OK 0x01: ERROR 0x02: WARNING
	@type		: "0x00: enum 0x01: else
*/
const data = [{
	FieldId: 0x200000,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 0
	}
},
{
	FieldId: 0x200001,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
},
{
	FieldId: 0x200010,
	FieldValue: {
		status: 0x00,
		value: 100,
		type: 1
	}
},
{
	FieldId: 0x200011,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 0
	}
},
{
	FieldId: 0x200100,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
},
{
	FieldId: 0x200101,
	FieldValue: {
		status: 0x00,
		value: 101,
		type: 1
	}
},
{
	FieldId: 0x200110,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 0
	}
},
{
	FieldId: 0x200111,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
},
{
	FieldId: 0x201000,
	FieldValue: {
		status: 0x00,
		value: 102,
		type: 1
	}
},
{
	FieldId: 0x201001,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 0
	}
},
{
	FieldId: 0x201010,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
},
{
	FieldId: 0x201011,
	FieldValue: {
		status: 0x00,
		value: 103,
		type: 1
	}
},
{
	FieldId: 0x201100,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 0
	}
},
{
	FieldId: 0x201101,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
},
{
	FieldId: 0x201110,
	FieldValue: {
		status: 0x00,
		value: 104,
		type: 1
	}
},
{
	FieldId: 0x201111,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 0
	}
},
{
	FieldId: 0x210000,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
},
{
	FieldId: 0x210001,
	FieldValue: {
		status: 0x00,
		value: 105,
		type: 1
	}
},
{
	FieldId: 0x210010,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 0
	}
},
{
	FieldId: 0x210011,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
},
{
	FieldId: 0x210100,
	FieldValue: {
		status: 0x00,
		value: 106,
		type: 1
	}
},
{
	FieldId: 0x210101,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 0
	}
},
{
	FieldId: 0x210110,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
},
{
	FieldId: 0x210111,
	FieldValue: {
		status: 0x00,
		value: 107,
		type: 1
	}
},
{
	FieldId: 0x211000,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 0
	}
},
{
	FieldId: 0x211001,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
}
];

module.exports = data;
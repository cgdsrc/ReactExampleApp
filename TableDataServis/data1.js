/*
	@FieldId	: int
	@FieldValue	: JSON
	@status		: "0x00: OK 0x01: ERROR 0x02: WARNING
	@type		: "0x00: enum 0x01: else
*/
const data = [{
	FieldId: 0x100000,
	FieldValue: {
		status: 0x00,
		value: 100,
		type: 0
		} 
	} ,
	{
	FieldId: 0x100001,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 1
	}
	},
	{
	FieldId: 0x100010,
	FieldValue: {
		status:0x02 ,
		value: 'Uyarı!',
		type: 1
	}
	},
	{
	FieldId: 0x100011,
	FieldValue: {
		status: 0x00,
		value: 101,
		type: 0
	}
	},
	{
	FieldId: 0x100100,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 1
	}
	},
	{
	FieldId: 0x100101,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
	},
	{
	FieldId: 0x100110,
	FieldValue: {
		status: 0x00,
		value: 102,
		type: 0
	}
	},
	{
	FieldId: 0x100111,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 1
	}
	},
	{
	FieldId: 0x101000,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
	},
	{
	FieldId: 0x101001,
	FieldValue: {
		status:0x00 ,
		value: 103,
		type: 0
	}
	},
	{
	FieldId: 0x101010,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 1
	}
	},
	{
	FieldId: 0x101011,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
	},
	{
	FieldId: 0x101100,
	FieldValue: {
		status:0x00 ,
		value: 104,
		type: 0
	}
	},
	{
	FieldId: 0x101101,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 1
	}
	},
	{
	FieldId: 0x101110,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
	},
	{
	FieldId: 0x101111,
	FieldValue: {
		status: 0x00,
		value: 105,
		type: 0
	}
	},
	{
	FieldId: 0x110000,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 1
	}
	},
	{
	FieldId: 0x110001,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
	},
	{
	FieldId: 0x110010,
	FieldValue: {
		status: 0x00,
		value: 106,
		type: 0
	}
	},
	{
	FieldId: 0x110011,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 1
	}
	},
	{
	FieldId: 0x110100,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
	},
	{
	FieldId: 0x110101,
	FieldValue: {
		status: 0x00,
		value: 107,
		type: 0
	}
	},
	{
	FieldId: 0x110110,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 1
	}
	},
	{
	FieldId: 0x110111,
	FieldValue: {
		status: 0x02,
		value: 'Uyarı!',
		type: 1
	}
	},
	{
	FieldId: 0x111000,
	FieldValue: {
		status: 0x00,
		value: 108,
		type: 0
	}
	},
	{
	FieldId: 0x111001,
	FieldValue: {
		status: 0x01,
		value: 'Hatalı deger!',
		type: 1
	}
	}
];


module.exports = data;
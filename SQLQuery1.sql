DROP TABLE [dbo].[Patients];
DROP TABLE [dbo].[Prescriptions];
DROP TABLE [dbo].[Consultations];


CREATE TABLE [dbo].[Patients] (
    [id]                 INT           IDENTITY (1, 1) NOT NULL,
    [name]       VARCHAR (100) NULL,
    [age]        INT           NULL,
    [contact]    VARCHAR (20)  NULL,
	[address]    VARCHAR (500) NULL,
	PRIMARY KEY CLUSTERED ([id] ASC)
	);

CREATE TABLE [dbo].[Prescriptions] (
    [id]                 INT           IDENTITY (1, 1) NOT NULL,
    [patient_id]         INT           NULL,
    [prescription_date]  VARCHAR (50)  NULL,
    [oral_examination]   VARCHAR (500) NULL,
    [medical_history]    VARCHAR (500) NULL,
    [investigation]      VARCHAR (500) NULL,
    [advice]             VARCHAR (500) NULL,
    [treatment]          VARCHAR (500) NULL,
    [appointment_date]   VARCHAR (50)  NULL,
    [appointment_time]   VARCHAR (50)  NULL,
    [next_task]          VARCHAR (500) NULL,
    [surgeon_charge]     INT           NULL,
    [assisstant_charge]  INT           NULL,
    [ot_charge]          INT           NULL,
    [suction_tube]       INT           NULL,
    [gloves]             INT           NULL,
    [sterilization_cost] INT           NULL,
    [needle]             INT           NULL,
    [remar_file]         INT           NULL,
    [bar]                INT           NULL,
    [polishing_bar]      INT           NULL,
    [polishing_paste]    INT           NULL,
    [datetime_filter]    BIGINT        NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
	FOREIGN KEY ([patient_id]) REFERENCES [Patients]([id])
);

CREATE TABLE [dbo].[Consultations] (
    [id]                INT           IDENTITY (1, 1) NOT NULL,
    [prescription_id]   INT           NULL,
    [consultation_date] VARCHAR (50)  NULL,
    [payment_recieved]  INT           NULL,
    [payment_left]      INT           NULL,
    [work_done]         VARCHAR (500) NULL,
    [upper_left]        VARCHAR (50)  NULL,
    [upper_right]       VARCHAR (50)  NULL,
    [lower_left]        VARCHAR (50)  NULL,
    [lower_right]       VARCHAR (50)  NULL,
    [next_task]         VARCHAR (500) NULL,
    [next_date]         VARCHAR (50)  NULL,
    [next_time]         VARCHAR (50)  NULL,
    [datetime_filter]   BIGINT        NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
	FOREIGN KEY ([prescription_id]) REFERENCES [Prescriptions]([id])
);


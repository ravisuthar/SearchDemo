USE [master]
GO
/****** Object:  Database [FoundationDB]    Script Date: 06/16/2014 07:14:01 ******/
CREATE DATABASE [FoundationDB] ON  PRIMARY 
( NAME = N'FoundationDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10.SQLEXPRESS\MSSQL\DATA\FoundationDB.mdf' , SIZE = 2048KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'FoundationDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10.SQLEXPRESS\MSSQL\DATA\FoundationDB_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [FoundationDB] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FoundationDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FoundationDB] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [FoundationDB] SET ANSI_NULLS OFF
GO
ALTER DATABASE [FoundationDB] SET ANSI_PADDING OFF
GO
ALTER DATABASE [FoundationDB] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [FoundationDB] SET ARITHABORT OFF
GO
ALTER DATABASE [FoundationDB] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [FoundationDB] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [FoundationDB] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [FoundationDB] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [FoundationDB] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [FoundationDB] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [FoundationDB] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [FoundationDB] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [FoundationDB] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [FoundationDB] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [FoundationDB] SET  DISABLE_BROKER
GO
ALTER DATABASE [FoundationDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [FoundationDB] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [FoundationDB] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [FoundationDB] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [FoundationDB] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [FoundationDB] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [FoundationDB] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [FoundationDB] SET  READ_WRITE
GO
ALTER DATABASE [FoundationDB] SET RECOVERY SIMPLE
GO
ALTER DATABASE [FoundationDB] SET  MULTI_USER
GO
ALTER DATABASE [FoundationDB] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [FoundationDB] SET DB_CHAINING OFF
GO
USE [FoundationDB]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 06/16/2014 07:14:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[id] [int] NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[Age] [int] NULL,
	[Registration] [date] NULL,
	[Project] [nvarchar](50) NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Customer] ([id], [FirstName], [LastName], [Email], [Age], [Registration], [Project], [Status]) VALUES (1, N'Ravi', N'suthar', N'sutharravi88@gmail.com', 28, CAST(0x54390B00 AS Date), N'bridge-x', 1)
INSERT [dbo].[Customer] ([id], [FirstName], [LastName], [Email], [Age], [Registration], [Project], [Status]) VALUES (2, N'Ravi2', N'suthar2', N'sutharravi88@gmail.com', 28, CAST(0x54390B00 AS Date), N'bridge-x', 1)
INSERT [dbo].[Customer] ([id], [FirstName], [LastName], [Email], [Age], [Registration], [Project], [Status]) VALUES (3, N'Ravi3', N'suthar3', N'sutharravi88@gmail.com', 28, CAST(0x54390B00 AS Date), N'bridge-x', 1)
INSERT [dbo].[Customer] ([id], [FirstName], [LastName], [Email], [Age], [Registration], [Project], [Status]) VALUES (4, N'Ravi4', N'suthar4', N'sutharravi88@gmail.com', 28, CAST(0x54390B00 AS Date), N'bridge-x', 1)
INSERT [dbo].[Customer] ([id], [FirstName], [LastName], [Email], [Age], [Registration], [Project], [Status]) VALUES (5, N'Ravi5', N'suthar5', N'sutharravi88@gmail.com', 28, CAST(0x54390B00 AS Date), N'bridge-x', 1)
INSERT [dbo].[Customer] ([id], [FirstName], [LastName], [Email], [Age], [Registration], [Project], [Status]) VALUES (6, N'Ravi6', N'suthar6', N'sutharravi88@gmail.com', 28, CAST(0x54390B00 AS Date), N'bridge-x', 1)
INSERT [dbo].[Customer] ([id], [FirstName], [LastName], [Email], [Age], [Registration], [Project], [Status]) VALUES (7, N'Ravi7', N'suthar7', N'sutharravi88@gmail.com', 28, CAST(0x54390B00 AS Date), N'bridge-x', 1)
INSERT [dbo].[Customer] ([id], [FirstName], [LastName], [Email], [Age], [Registration], [Project], [Status]) VALUES (8, N'Ravi8', N'suthar8', N'sutharravi88@gmail.com', 28, CAST(0x54390B00 AS Date), N'bridge-x', 1)

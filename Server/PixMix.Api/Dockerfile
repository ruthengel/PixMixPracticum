# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443



# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["PixMix.Api/PixMix.Api.csproj", "PixMix.Api/"]
COPY ["PixMix.Data/PixMix.Data.csproj", "PixMix.Data/"]
COPY ["PixMix.Core/PixMix.Core.csproj", "PixMix.Core/"]
COPY ["PixMix.Service/PixMix.Service.csproj", "PixMix.Service/"]
RUN dotnet restore "./PixMix.Api/PixMix.Api.csproj"
COPY . .
WORKDIR "/src/PixMix.Api"
RUN dotnet build "./PixMix.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./PixMix.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PixMix.Api.dll"]
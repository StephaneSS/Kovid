# JDK 11 maven package
FROM maven:3.6.3-jdk-11-slim AS maven_jdk_package
WORKDIR /app
COPY ./pom.xml /app/pom.xml
RUN mvn verify clean --fail-never

COPY . /app
RUN mvn -v
RUN mvn clean package -DskipTests

# Run the app
FROM openjdk:11-jre-slim as openjdk_11
COPY --from=maven_jdk_package /app/target/KoRe.war /KoRe.war
CMD ["java", "-jar", "-Dspring.profiles.active=default", "/KoRe.war"]
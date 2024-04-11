FROM ubuntu:latest
LABEL authors="kyumericano"

ENTRYPOINT ["top", "-b"]

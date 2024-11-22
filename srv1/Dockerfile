FROM amd64/alpine:latest

WORKDIR /app

RUN apk update && apk add python3 py3-pip py3-virtualenv procps

COPY . /app/

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

RUN pip3 install --no-cache-dir requests==2.31.0 && pip3 install --no-cache-dir docker

CMD ["python3","./srv1.py"]
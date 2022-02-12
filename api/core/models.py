from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)

from core.utils.models import file_upload_path


class TimeStampedModel(models.Model):
    """Abstract model class with times stamp values.

    Parameters
    ----------
    models : django.db.models.Model
        Django Model Class.
    """

    created_at = models.DateTimeField("Creation date", auto_now_add=True)
    updated_at = models.DateTimeField("Last modified date", auto_now=True)

    class Meta:
        abstract = True


class UserManager(BaseUserManager):
    def create_user(self, email, first_name, password=None):
        """
        Creates and saves a User with the given email, first name and password.
        """

        if not email:
            raise ValueError("Users must have an email address")
        if not first_name:
            raise ValueError("Users must have a first name")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
        )

        user.is_active = True
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, first_name, password=None):
        """
        Creates and saves a superuser with the given email, first name and password.
        """

        user = self.create_user(
            email,
            password=password,
            first_name=first_name,
        )
        user.is_active = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
    first_name = models.CharField(
        verbose_name="Nome",
        max_length=255,
    )
    last_name = models.CharField(
        verbose_name="Sobrenome",
        max_length=255,
        blank=True,
    )
    photo = models.ImageField(
        verbose_name="Foto",
        default="default/user-photo.png",
        upload_to=file_upload_path,
    )
    cpf = models.CharField(verbose_name="CPF", max_length=14, unique=True, null=True)
    date_of_birth = models.DateField(verbose_name="Data de nascimento", null=True)
    date_joined = models.DateTimeField(
        verbose_name="Data de cadastro", auto_now_add=True
    )
    last_login = models.DateTimeField(verbose_name="Último login", auto_now=True)
    is_active = models.BooleanField(verbose_name="Usuário ativo", default=False)
    is_admin = models.BooleanField(verbose_name="Usuário admin", default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name"]

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
